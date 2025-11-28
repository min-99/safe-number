const PREFIX = '[safe-number]';
export const ERROR_MESSAGES = {
  INVALID_INPUT: (value: unknown) =>
    `${PREFIX} Invalid input: Cannot convert ${value} to BigInt.`, // 입력이 유효하지 않을 때
  DIVISION_BY_ZERO: `${PREFIX} Division by 0 is not allowed.`, // 0으로 나누기 시도할 때
  EMPTY_ARRAY_MAX: `${PREFIX} Cannot calculate max of empty array.`, // 빈 배열에서 max 계산 시도할 때
  EMPTY_ARRAY_MIN: `${PREFIX} Cannot calculate min of empty array.`, // 빈 배열에서 min 계산 시도할 때
  EMPTY_ARRAY_SUM: `${PREFIX} Cannot calculate sum of empty array.`, // 빈 배열에서 sum 계산 시도할 때
  INVALID_JSON: (text: string) => `${PREFIX} Invalid JSON: ${text}.`, // JSON 문자열이 유효하지 않을 때
  INVALID_JSON_UNCLOSED_STRING: `${PREFIX} Invalid JSON: unclosed string.`, // 닫는 따옴표를 찾지 못할 때
  INVALID_JSON_INVALID_KEY_FORMAT: `${PREFIX} Invalid JSON: invalid key format.`, // 키 형식이 유효하지 않을 때
  INVALID_JSON_EXPECTED_COLON_AFTER_KEY: `${PREFIX} Invalid JSON: expected colon after key.`, // 콜론을 찾지 못할 때
  INVALID_JSON_MISSING_KEY: `${PREFIX} Invalid JSON: missing key.`, // 키를 찾지 못할 때
  INVALID_JSON_MALFORMED_OBJECT: `${PREFIX} Invalid JSON: malformed object.`, // 객체가 유효하지 않을 때
} as const;
