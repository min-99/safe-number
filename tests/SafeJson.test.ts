import { describe, it, expect } from 'vitest';

import * as SafeJson from '@json/SafeJson';
import { ERROR_MESSAGES } from '@/error';

describe('SafeJson', () => {
  describe('stringify', () => {
    it('should stringify a BigInt', () => {
      expect(SafeJson.stringify({ a: 1n })).toBe('{"a":1n}');
    });

    it('should stringify a number', () => {
      expect(SafeJson.stringify({ a: 1 })).toBe('{"a":1}');
    });

    it('should stringify a string', () => {
      expect(SafeJson.stringify({ a: '1' })).toBe('{"a":"1"}');
    });

    it('should stringify a boolean', () => {
      expect(SafeJson.stringify({ a: true })).toBe('{"a":true}');
    });

    it('should stringify a null', () => {
      expect(SafeJson.stringify({ a: null })).toBe('{"a":null}');
    });

    it('should stringify a undefined', () => {
      expect(SafeJson.stringify({ a: undefined })).toBe('{"a":undefined}');
    });

    it('should stringify a object', () => {
      expect(SafeJson.stringify({ a: { b: 1 } })).toBe('{"a":{"b":1}}');
    });

    it('should stringify a array', () => {
      expect(SafeJson.stringify({ a: [1, 2, 3] })).toBe('{"a":[1,2,3]}');
    });

    it('should stringify a object with a BigInt', () => {
      expect(SafeJson.stringify({ a: { b: 1n } })).toBe('{"a":{"b":1n}}');
    });

    it('should stringify a object with a number', () => {
      expect(SafeJson.stringify({ a: { b: 1 } })).toBe('{"a":{"b":1}}');
    });

    it('should stringify a object with a string', () => {
      expect(SafeJson.stringify({ a: { b: '1' } })).toBe('{"a":{"b":"1"}}');
    });

    it('should stringify a object with a boolean', () => {
      expect(SafeJson.stringify({ a: { b: true } })).toBe('{"a":{"b":true}}');
    });

    it('should stringify a object with a null', () => {
      expect(SafeJson.stringify({ a: { b: null } })).toBe('{"a":{"b":null}}');
    });

    it('should stringify a object with a undefined', () => {
      expect(SafeJson.stringify({ a: { b: undefined } })).toBe(
        '{"a":{"b":undefined}}',
      );
    });

    it('should stringify a object with a object', () => {
      expect(SafeJson.stringify({ a: { b: { c: 1 } } })).toBe(
        '{"a":{"b":{"c":1}}}',
      );
    });

    it('should stringify a function using default case', () => {
      const fn = () => {};
      // JSON.stringify와 동일하게 함수가 포함된 키-값 쌍은 제거됨
      expect(SafeJson.stringify({ a: fn })).toBe('{}');
    });

    it('should stringify a symbol using default case', () => {
      const sym = Symbol('test');
      // JSON.stringify와 동일하게 함수가 포함된 키-값 쌍은 제거됨
      expect(SafeJson.stringify({ a: sym })).toBe('{}');
    });
  });

  describe('parse', () => {
    it('should parse a number', () => {
      expect(SafeJson.parse('{"a":1}')).toEqual({ a: 1 });
    });

    it('should parse a string', () => {
      expect(SafeJson.parse('{"a":"hello"}')).toEqual({ a: 'hello' });
    });

    it('should parse a boolean', () => {
      expect(SafeJson.parse('{"a":true}')).toEqual({ a: true });
    });

    it('should parse a null', () => {
      expect(SafeJson.parse('{"a":null}')).toEqual({ a: null });
    });

    it('should parse a array', () => {
      expect(SafeJson.parse('{"a":[1,2,3]}')).toEqual({ a: [1, 2, 3] });
    });

    it('should parse a nested object', () => {
      expect(SafeJson.parse('{"a":{"b":1}}')).toEqual({ a: { b: 1 } });
    });

    it('should parse a BigInt from string ending with "n"', () => {
      const result = SafeJson.parse('{"a":"123n"}') as { a: bigint };
      expect(result.a).toBe(123n);
      expect(typeof result.a).toBe('bigint');
    });

    it('should parse multiple BigInt values', () => {
      const result = SafeJson.parse(
        '{"id":"12345678901234567890n","balance":"1000000000000000000n"}',
      ) as { id: bigint; balance: bigint };
      expect(result.id).toBe(12345678901234567890n);
      expect(result.balance).toBe(1000000000000000000n);
    });

    it('should not convert string that does not end with "n"', () => {
      const result = SafeJson.parse('{"a":"hello"}') as { a: string };
      expect(result.a).toBe('hello');
      expect(typeof result.a).toBe('string');
    });

    it('should parse complex nested object with BigInt', () => {
      const result = SafeJson.parse(
        '{"user":{"id":"123n","name":"John"},"balance":"1000n"}',
      ) as { user: { id: bigint; name: string }; balance: bigint };
      expect(result.user.id).toBe(123n);
      expect(result.user.name).toBe('John');
      expect(result.balance).toBe(1000n);
    });

    it('should throw error for invalid JSON', () => {
      const json = '{invalid json}';
      expect(() => SafeJson.parse(json)).toThrow(
        ERROR_MESSAGES.INVALID_JSON(json),
      );
    });

    it('should throw error for unclosed string in key (custom parser)', () => {
      const json = '{"unclosed:1}';
      expect(() => SafeJson.parse(json)).toThrow(
        ERROR_MESSAGES.INVALID_JSON_UNCLOSED_STRING,
      );
    });

    it('should throw error for invalid key format (custom parser)', () => {
      const json = '{"key\\u":1}';
      expect(() => SafeJson.parse(json)).toThrow(
        ERROR_MESSAGES.INVALID_JSON_INVALID_KEY_FORMAT,
      );
    });

    it('should throw error when colon is missing after key', () => {
      const json = '{"key"x1}';
      expect(() => SafeJson.parse(json)).toThrow(
        ERROR_MESSAGES.INVALID_JSON_EXPECTED_COLON_AFTER_KEY,
      );
    });

    it('should throw error when colon is missing at end (custom parser)', () => {
      expect(() => SafeJson.parse('{"key" }')).toThrow(
        ERROR_MESSAGES.INVALID_JSON_EXPECTED_COLON_AFTER_KEY,
      );
    });

    it('should execute i++ in colon search loop (custom parser)', () => {
      expect(() => SafeJson.parse('{"key"   x}')).toThrow(
        ERROR_MESSAGES.INVALID_JSON_EXPECTED_COLON_AFTER_KEY,
      );
    });

    it('should throw error for missing key (custom parser)', () => {
      const json = '{:1}';
      expect(() => SafeJson.parse(json)).toThrow();
    });

    it('should throw error for missing key', () => {
      const json = '{:1}';
      expect(() => SafeJson.parse(json)).toThrow();
    });
  });

  it('should stringify and parse complex nested object with NumberLike', () => {
    const json = {
      a: 1, // number
      b: 10n,
      c: '100',
      d: '100n',
      e: 'n',
      f: true,
      g: null,
      h: undefined,
      i: [1, 2, 3],
      j: { a: 1, b: 2, c: 3 },
      m: {
        n: {
          o: 1,
          p: 2,
          q: 3,
        },
      },
    };
    const result = SafeJson.stringify(json);
    const parsed = SafeJson.parse(result);

    expect(parsed).toEqual(json);
  });
});
