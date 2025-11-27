import { NumberLike, toBigInt } from '@/types';

/**
 * 뎃셈
 * @param a - 첫 번째 숫자
 * @param b - 두 번째 숫자
 * @returns 두 숫자의 합
 */
export const plus = (a: NumberLike, b: NumberLike): bigint => {
  return toBigInt(a) + toBigInt(b);
};

/**
 * 뺄셈
 * @param a - 첫 번째 숫자
 * @param b - 두 번째 숫자
 * @returns 두 숫자의 차
 */
export const subtraction = (a: NumberLike, b: NumberLike): bigint => {
  return toBigInt(a) - toBigInt(b);
};

/**
 * 나눗셈
 * @param a - 첫 번째 숫자
 * @param b - 두 번째 숫자
 * @throws {RangeError} 0으로 나눌 경우
 * @returns 두 숫자의 몫
 */
export const divide = (a: NumberLike, b: NumberLike): bigint => {
  const divisor = toBigInt(b);
  if (divisor === 0n) {
    throw new RangeError('[safe-number] Division by 0 is not allowed.');
  }
  return toBigInt(a) / divisor;
};

/**
 * 곱셈
 * @param a - 첫 번째 숫자
 * @param b - 두 번째 숫자
 * @returns 두 숫자의 곱
 */
export const multiply = (a: NumberLike, b: NumberLike): bigint => {
  return toBigInt(a) * toBigInt(b);
};

/**
 * 크기비교(a > b)
 * @param a - 첫 번째 숫자
 * @param b - 두 번째 숫자
 * @returns 두 숫자의 크기 비교 결과
 */
export const gt = (a: NumberLike, b: NumberLike): boolean => {
  return toBigInt(a) > toBigInt(b);
};

/**
 * 크기비교(a >= b)
 * @param a - 첫 번째 숫자
 * @param b - 두 번째 숫자
 * @returns 두 숫자의 크기 비교 결과
 */
export const gte = (a: NumberLike, b: NumberLike): boolean => {
  return toBigInt(a) >= toBigInt(b);
};

/**
 * 크기비교(a < b)
 * @param a - 첫 번째 숫자
 * @param b - 두 번째 숫자
 * @returns 두 숫자의 크기 비교 결과
 */
export const lt = (a: NumberLike, b: NumberLike): boolean => {
  return toBigInt(a) < toBigInt(b);
};

/**
 * 크기비교(a <= b)
 * @param a - 첫 번째 숫자
 * @param b - 두 번째 숫자
 * @returns 두 숫자의 크기 비교 결과
 */
export const lte = (a: NumberLike, b: NumberLike): boolean => {
  return toBigInt(a) <= toBigInt(b);
};

/**
 * 크기비교(a === b)
 * @param a - 첫 번째 숫자
 * @param b - 두 번째 숫자
 * @returns 두 숫자의 크기 비교 결과
 */
export const equal = (a: NumberLike, b: NumberLike): boolean => {
  return toBigInt(a) === toBigInt(b);
};
