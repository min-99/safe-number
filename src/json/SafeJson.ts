import { ERROR_MESSAGES } from '@/error';

/**
 * 값이 객체인지 확인하는 타입 가드
 */
const isObject = (value: unknown): value is object => {
  return value !== null && typeof value === 'object';
};

/**
 * 값을 JSON 문자열로 변환하는 헬퍼 함수
 */
const stringifyValue = (value: unknown): string => {
  // null과 undefined는 typeof로 체크 불가능하므로 먼저 처리
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';

  // 배열 체크 (typeof는 'object'를 반환하므로 먼저 체크)
  if (Array.isArray(value)) {
    const items = value.map(stringifyValue).join(',');
    return `[${items}]`;
  }

  // 타입별 처리
  switch (typeof value) {
    case 'bigint':
      return `${value}n`;
    case 'string':
      return JSON.stringify(value);
    case 'number':
    case 'boolean':
      return String(value);
    case 'object': {
      const entries = Object.entries(value)
        .map(([key, val]) => {
          // 함수나 심볼 값은 제거 (JSON.stringify와 동일한 동작)
          if (typeof val === 'function' || typeof val === 'symbol') {
            return null;
          }
          const keyStr = JSON.stringify(key);
          const valStr = stringifyValue(val);
          return `${keyStr}:${valStr}`;
        })
        .filter((entry) => entry !== null)
        .join(',');
      return `{${entries}}`;
    }
    default:
      return JSON.stringify(value);
  }
};

/**
 * BigInt가 포함된 객체를 안전하게 JSON 문자열로 변환합니다.
 * BigInt는 `1n` 형식으로, undefined는 `undefined`로 출력됩니다.
 * @param value - 변환할 객체
 * @param space - 옵션: JSON 문자열의 공백 간격 (현재 미지원)
 * @returns JSON 문자열
 */
export const stringify = (value: unknown): string => {
  return stringifyValue(value);
};

/**
 * 값을 파싱하는 헬퍼 함수
 */
const parseValue = (value: string): unknown => {
  const trimmed = value.trim();

  // null
  if (trimmed === 'null') return null;

  // undefined
  if (trimmed === 'undefined') return undefined;

  // boolean
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;

  // BigInt (숫자로만 구성되고 'n'으로 끝남)
  if (/^-?\d+n$/.test(trimmed)) {
    return BigInt(trimmed.slice(0, -1));
  }

  // number
  if (/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(trimmed)) {
    return Number(trimmed);
  }

  // string (따옴표로 시작하고 끝남)
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return JSON.parse(trimmed);
  }

  // array
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    const content = trimmed.slice(1, -1).trim();
    if (!content) return [];
    const items = content.split(',').map((item) => parseValue(item.trim()));
    return items;
  }

  // object
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    const content = trimmed.slice(1, -1).trim();
    if (!content) return {};
    const obj: Record<string, unknown> = {};
    let depth = 0;
    let keyEnd = -1;
    let valueStart = -1;
    let currentKey = '';
    let hasValidEntry = false;

    for (let i = 0; i < content.length; i++) {
      const char = content[i];
      if (char === '{' || char === '[') depth++;
      if (char === '}' || char === ']') depth--;
      if (char === '"' && depth === 0) {
        if (keyEnd === -1) {
          // key 시작
          const keyStart = i;
          let j = i + 1;
          while (j < content.length && content[j] !== '"') {
            if (content[j] === '\\') j++;
            j++;
          }
          if (j >= content.length) {
            throw new Error(ERROR_MESSAGES.INVALID_JSON_UNCLOSED_STRING);
          }
          keyEnd = j;
          try {
            currentKey = JSON.parse(content.slice(keyStart, keyEnd + 1));
          } catch {
            throw new Error(ERROR_MESSAGES.INVALID_JSON_INVALID_KEY_FORMAT);
          }
          i = j + 1;
          // 콜론 찾기
          while (i < content.length && content[i] !== ':') {
            if (content[i] !== ' ') {
              throw new Error(
                ERROR_MESSAGES.INVALID_JSON_EXPECTED_COLON_AFTER_KEY,
              );
            }
            i++;
          }
          if (i >= content.length) {
            throw new Error(
              ERROR_MESSAGES.INVALID_JSON_EXPECTED_COLON_AFTER_KEY,
            );
          }
          valueStart = i + 1;
        }
      }
      if (
        depth === 0 &&
        (char === ',' || i === content.length - 1) &&
        valueStart !== -1
      ) {
        const valueEnd = i === content.length - 1 ? i + 1 : i;
        const valueStr = content.slice(valueStart, valueEnd).trim();
        if (!currentKey) {
          throw new Error(ERROR_MESSAGES.INVALID_JSON_MISSING_KEY);
        }
        obj[currentKey] = parseValue(valueStr);
        hasValidEntry = true;
        keyEnd = -1;
        valueStart = -1;
        currentKey = '';
      }
    }

    // 유효한 엔트리가 없고 내용이 있으면 에러
    if (!hasValidEntry && content.trim()) {
      throw new Error(ERROR_MESSAGES.INVALID_JSON_MALFORMED_OBJECT);
    }

    return obj;
  }

  // 기본값 (문자열로 처리)
  return trimmed;
};

/**
 * JSON 문자열을 파싱합니다.
 * 표준 JSON 형식과 커스텀 형식(stringify가 생성한 형식) 모두 지원합니다.
 * @param text - 파싱할 JSON 문자열
 * @returns 파싱된 객체
 */
export const parse = (text: string): object => {
  try {
    let result: unknown;

    // 먼저 표준 JSON 형식으로 파싱 시도
    try {
      result = JSON.parse(text, (_key, val) => {
        // 숫자로만 구성되고 'n'으로 끝나는 문자열만 BigInt로 변환
        if (
          typeof val === 'string' &&
          val.endsWith('n') &&
          /^-?\d+n$/.test(val)
        ) {
          return BigInt(val.slice(0, -1));
        }
        return val;
      });
    } catch {
      // 표준 JSON이 아니면 커스텀 파서 사용 (stringify가 생성한 형식)
      result = parseValue(text);
    }

    // 객체인지 확인
    if (!isObject(result)) {
      throw new Error(ERROR_MESSAGES.INVALID_JSON(text));
    }

    return result;
  } catch (error) {
    throw new Error(`${ERROR_MESSAGES.INVALID_JSON(text)} - ${error}`);
  }
};
