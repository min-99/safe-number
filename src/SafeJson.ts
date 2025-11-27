import { ERROR_MESSAGES } from './error';

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
          const keyStr = JSON.stringify(key);
          const valStr = stringifyValue(val);
          return `${keyStr}:${valStr}`;
        })
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
 * JSON 문자열을 파싱합니다.
 * @param text - 파싱할 JSON 문자열
 * @returns 파싱된 객체
 */
export const parse = (text: string): unknown => {
  try {
    return JSON.parse(text, (_key, val) => {
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
  } catch (error) {
    throw new Error(`${ERROR_MESSAGES.INVALID_JSON(text)} - ${error}`);
  }
};
