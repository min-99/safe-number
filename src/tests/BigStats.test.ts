import { describe, it, expect } from 'vitest';

import * as BigStats from '../BigStats';
import { ERROR_MESSAGES } from '@/error';

describe('BigStats', () => {
  // 1. max 테스트
  describe('max', () => {
    it('should return the maximum value in the array', () => {
      expect(BigStats.max([1, 2, 3, 4, 5])).toBe(5n);
    });

    it('should throw an error if the array is empty', () => {
      expect(() => BigStats.max([])).toThrow(ERROR_MESSAGES.EMPTY_ARRAY_MAX);
    });
  });

  // 2. min 테스트
  describe('min', () => {
    it('should return the minimum value in the array', () => {
      expect(BigStats.min([1, 2, 3, 4, 5])).toBe(1n);
    });

    it('should throw an error if the array is empty', () => {
      expect(() => BigStats.min([])).toThrow(ERROR_MESSAGES.EMPTY_ARRAY_MIN);
    });
  });

  // 3. sum 테스트
  describe('sum', () => {
    it('should return the sum of the array', () => {
      expect(BigStats.sum([1, 2, 3, 4, 5])).toBe(15n);
    });

    it('should throw an error if the array is empty', () => {
      expect(() => BigStats.sum([])).toThrow(ERROR_MESSAGES.EMPTY_ARRAY_SUM);
    });
  });
});
