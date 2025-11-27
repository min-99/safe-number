const PREFIX = '[safe-number]';
export const ERROR_MESSAGES = {
  INVALID_INPUT: (value: unknown) =>
    `${PREFIX} Invalid input: Cannot convert ${value} to BigInt.`, // 입력이 유효하지 않을 때
  DIVISION_BY_ZERO: `${PREFIX} Division by 0 is not allowed.`, // 0으로 나누기 시도할 때
  EMPTY_ARRAY_MAX: `${PREFIX} Cannot calculate max of empty array.`, // 빈 배열에서 max 계산 시도할 때
  EMPTY_ARRAY_MIN: `${PREFIX} Cannot calculate min of empty array.`, // 빈 배열에서 min 계산 시도할 때
  EMPTY_ARRAY_SUM: `${PREFIX} Cannot calculate sum of empty array.`, // 빈 배열에서 sum 계산 시도할 때
} as const;
