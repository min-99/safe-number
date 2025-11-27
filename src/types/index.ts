import { ERROR_MESSAGES } from '@/error';

export type NumberLike = number | bigint | string;

/**
 * 입력값을 안전하게 BigInt로 변환하는 내부 유틸리티
 * @throws {TypeError} 변환할 수 없는 값을 경우
 */

export const toBigInt = (value: NumberLike): bigint => {
  try {
    return BigInt(value);
  } catch {
    throw new TypeError(ERROR_MESSAGES.INVALID_INPUT(value));
  }
};
