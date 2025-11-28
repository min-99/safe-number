import { describe, it, expect } from 'vitest';

import * as SafeMath from '@core/SafeMath';
import { ERROR_MESSAGES } from '@/error';

describe('SafeMath', () => {
  describe('plus', () => {
    // 1. 덧셈 테스트
    it('should correctly add mixed types (number + string)', () => {
      expect(SafeMath.plus(10, '20')).toBe(30n);
    });

    it('should correctly add mixed types (string + string)', () => {
      expect(SafeMath.plus('10', '20')).toBe(30n);
    });

    it('should correctly add mixed types (number + number)', () => {
      expect(SafeMath.plus(11, 22)).toBe(33n);
    });

    it('should handle negative numbers (number + string)', () => {
      expect(SafeMath.plus(-10, '-5')).toBe(-15n);
    });

    it('should handle negative numbers (string + string)', () => {
      expect(SafeMath.plus('-10', '-5')).toBe(-15n);
    });

    it('should handle negative numbers (number + number)', () => {
      expect(SafeMath.plus(-11, -22)).toBe(-33n);
    });

    it('should handle Safe Integer Overflow', () => {
      const maxSafe = Number.MAX_SAFE_INTEGER;
      expect(SafeMath.plus(maxSafe, 1)).toBe(9007199254740992n);
    });
  });

  // 2. 뺄셈 테스트
  it('should correctly add mixed types (number + string)', () => {
    expect(SafeMath.subtraction(10, '20')).toBe(-10n);
  });

  it('should correctly add mixed types (string + string)', () => {
    expect(SafeMath.subtraction('10', '20')).toBe(-10n);
  });

  it('should correctly add mixed types (number + number)', () => {
    expect(SafeMath.subtraction(11, 22)).toBe(-11n);
  });

  it('should handle negative numbers (number + string)', () => {
    expect(SafeMath.subtraction(-10, '-5')).toBe(-5n);
  });

  it('should handle negative numbers (string + string)', () => {
    expect(SafeMath.subtraction('-10', '-5')).toBe(-5n);
  });

  it('should handle negative numbers (number + number)', () => {
    expect(SafeMath.subtraction(-11, -22)).toBe(11n);
  });

  it('should handle Safe Integer Overflow', () => {
    const maxSafe = Number.MAX_SAFE_INTEGER;
    expect(SafeMath.subtraction(maxSafe, maxSafe)).toBe(0n);
  });

  // 3. 곱셈 테스트
  describe('multiply', () => {
    it('should correctly multiply mixed types (number * string)', () => {
      expect(SafeMath.multiply(10, '20')).toBe(200n);
    });

    it('should multiply large numbers correctly', () => {
      const a = '1000000000000000000';
      const b = 2;
      expect(SafeMath.multiply(a, b)).toBe(2000000000000000000n);
    });

    it('should return 0 when multiplied by 0', () => {
      expect(SafeMath.multiply(12345n, 0)).toBe(0n);
    });
  });

  // 4. 나눗셈 테스트
  describe('divide', () => {
    it('should return integer result (floor)', () => {
      // 10 / 3 = 3.333... -> 3n (BigInt는 소수점 버림)
      expect(SafeMath.divide(10, 3)).toBe(3n);
    });

    it('should throw RangeError when dividing by zero', () => {
      // 0으로 나누면 에러가 터져야 함
      expect(() => SafeMath.divide(100, 0)).toThrow(RangeError);
      expect(() => SafeMath.divide(100, '0')).toThrow(
        ERROR_MESSAGES.DIVISION_BY_ZERO,
      );
    });
  });

  // 5. 비교 연산 테스트
  describe('Comparisons', () => {
    it('gt (greater than)', () => {
      expect(SafeMath.gt(10, 5n)).toBe(true);
      expect(SafeMath.gt(5, 10n)).toBe(false);
    });

    it('gte (greater than or equal)', () => {
      expect(SafeMath.gte(10, 10n)).toBe(true);
      expect(SafeMath.gte(11, 10)).toBe(true);
    });

    it('lt (less than)', () => {
      expect(SafeMath.lt(5, '10')).toBe(true);
    });

    it('lte (less than or equal)', () => {
      expect(SafeMath.lte(10, 10)).toBe(true);
    });

    it('eq (equal)', () => {
      expect(SafeMath.equal(10, '10')).toBe(true);
      expect(SafeMath.equal(10, 11)).toBe(false);
    });
  });

  // 6. 예외 처리 테스트 (잘못된 입력)
  describe('Invalid Input Handling', () => {
    it('should throw TypeError for non-numeric strings', () => {
      expect(() => SafeMath.plus(10, 'hello')).toThrow(TypeError);
    });
    it('should throw TypeError for non-numeric strings', () => {
      expect(() => SafeMath.subtraction(10, 'hello')).toThrow(TypeError);
    });
    it('should throw TypeError for non-numeric strings', () => {
      expect(() => SafeMath.multiply(10, 'hello')).toThrow(TypeError);
    });
    it('should throw TypeError for non-numeric strings', () => {
      expect(() => SafeMath.divide(10, 'hello')).toThrow(TypeError);
    });
  });
});
