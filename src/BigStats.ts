import { toBigInt, type NumberLike } from '@/types';
import { ERROR_MESSAGES } from './error';

/**
 * 배열 내 최댓값을 찾습니다. (Stack Overflow 방지)
 * @param arr - 숫자 배열
 * @returns 최댓값
 * @throws {Error} 빈 배열일 경우
 */
export const max = (arr: NumberLike[]): bigint => {
  if (arr.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_ARRAY_MAX);
  }

  return arr.reduce<bigint>((maxVal, current) => {
    const currentBig = toBigInt(current);
    return currentBig > maxVal ? currentBig : maxVal;
  }, toBigInt(arr[0]));
};

/**
 * 배열 내 최솟값을 찾습니다.
 * @param arr - 숫자 배열
 * @returns 최솟값
 * @throws {Error} 빈 배열일 경우
 */
export const min = (arr: NumberLike[]): bigint => {
  if (arr.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_ARRAY_MIN);
  }
  return arr.reduce<bigint>((minVal, current) => {
    const currentBig = toBigInt(current);
    return currentBig < minVal ? currentBig : minVal;
  }, toBigInt(arr[0]));
};

/**
 * 배열의 총합을 구합니다.
 * @param arr - 숫자 배열
 * @returns 총합
 * @throws {Error} 빈 배열일 경우
 */
export const sum = (arr: NumberLike[]): bigint => {
  if (arr.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_ARRAY_SUM);
  }
  return arr.reduce<bigint>((sum, current) => sum + toBigInt(current), 0n);
};
