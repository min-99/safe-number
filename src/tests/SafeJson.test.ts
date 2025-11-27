import { describe, it, expect } from 'vitest';

import * as SafeJson from '../SafeJson';
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
      expect(SafeJson.stringify({ a: fn })).toBe('{"a":undefined}');
    });

    it('should stringify a symbol using default case', () => {
      const sym = Symbol('test');
      expect(SafeJson.stringify({ a: sym })).toBe('{"a":undefined}');
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
  });
});
