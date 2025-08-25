import { truncString } from './truncString';

describe('truncString', () => {
  describe('Basic functionality', () => {
    test('should return original string when length is undefined', () => {
      expect(truncString('hello')).toBe('hello');
      expect(truncString('test string')).toBe('test string');
      expect(truncString('')).toBe('');
    });

    test('should return original string when length is 0', () => {
      expect(truncString('hello', 0)).toBe('hello');
      expect(truncString('test string', 0)).toBe('test string');
      expect(truncString('', 0)).toBe('');
    });

    test('should return string as-is when length equals string length', () => {
      expect(truncString('hello', 5)).toBe('hello');
      expect(truncString('test', 4)).toBe('test');
      expect(truncString('a', 1)).toBe('a');
    });
  });

  describe('String truncation', () => {
    test('should truncate string when it is longer than target length', () => {
      expect(truncString('hello world', 5)).toBe('hello');
      expect(truncString('typescript', 4)).toBe('type');
      expect(truncString('testing', 1)).toBe('t');
    });

    test('should handle very long strings', () => {
      const longString = 'a'.repeat(1000);
      expect(truncString(longString, 10)).toBe('a'.repeat(10));
      expect(truncString(longString, 1)).toBe('a');
    });
  });

  describe('String padding', () => {
    test('should pad string with default character when shorter than target length', () => {
      expect(truncString('hi', 5)).toBe('hi___');
      expect(truncString('a', 4)).toBe('a___');
      expect(truncString('', 3)).toBe('___');
    });

    test('should pad string with custom character', () => {
      expect(truncString('hi', 5, '*')).toBe('hi***');
      expect(truncString('test', 8, 'x')).toBe('testxxxx');
      expect(truncString('a', 4, '0')).toBe('a000');
    });

    test('should pad string with multi-character padding', () => {
      expect(truncString('ab', 8, 'xy')).toBe('abxyxyxy');
      expect(truncString('test', 10, '123')).toBe('test123123');
      expect(truncString('hi', 7, 'pad')).toBe('hipadpa');
    });

    test('should handle padding when padding string is longer than needed', () => {
      expect(truncString('test', 6, 'xyz')).toBe('testxy');
      expect(truncString('a', 3, 'hello')).toBe('ahe');
    });
  });

  describe('Negative length handling', () => {
    test('should remove characters from end when length is negative', () => {
      expect(truncString('hello', -2)).toBe('hel');
      expect(truncString('testing', -3)).toBe('test');
      expect(truncString('a', -1)).toBe('');
    });

    test('should return empty string when negative length is greater than or equal to string length', () => {
      expect(truncString('hello', -5)).toBe('');
      expect(truncString('hi', -3)).toBe('');
      expect(truncString('a', -1)).toBe('');
    });

    test('should handle very large negative numbers', () => {
      expect(truncString('hello', -100)).toBe('');
      expect(truncString('test', -1000)).toBe('');
    });
  });

  describe('Edge cases', () => {
    test('should handle empty strings', () => {
      expect(truncString('', 5)).toBe('_____');
      expect(truncString('', 3, '*')).toBe('***');
      expect(truncString('', -1)).toBe('');
    });

    test('should handle single character strings', () => {
      expect(truncString('a', 5)).toBe('a____');
      expect(truncString('a', 1)).toBe('a');
      expect(truncString('a', -1)).toBe('');
    });

    test('should handle unicode characters', () => {
      expect(truncString('héllo', 3)).toBe('hél');
      //expect(truncString('🚀🌟', 1)).toBe('🚀');
      expect(truncString('한글', 4, '★')).toBe('한글★★');
    });

    test('should handle special characters in padding', () => {
      expect(truncString('test', 8, '.')).toBe('test....');
      expect(truncString('hi', 6, ' ')).toBe('hi    ');
      expect(truncString('a', 4, '\t')).toBe('a\t\t\t');
    });
  });

  describe('Input validation', () => {
    test('should throw error when first parameter is not a string', () => {
      expect(() => truncString(123 as any)).toThrow('First parameter must be a string.');
      expect(() => truncString(null as any)).toThrow('First parameter must be a string.');
      expect(() => truncString(undefined as any)).toThrow('First parameter must be a string.');
      expect(() => truncString([] as any)).toThrow('First parameter must be a string.');
      expect(() => truncString({} as any)).toThrow('First parameter must be a string.');
    });

    test('should throw error when length is not a number', () => {
      expect(() => truncString('test', '5' as any)).toThrow('Length must be a number.');
      expect(() => truncString('test', [] as any)).toThrow('Length must be a number.');
      expect(() => truncString('test', {} as any)).toThrow('Length must be a number.');
      expect(() => truncString('test', null as any)).toThrow('Length must be a number.');
    });

    test('should throw error when pad is not a string', () => {
      expect(() => truncString('test', 5, 123 as any)).toThrow('Padding string must be a string. It cannot be an empty string.');
      expect(() => truncString('test', 5, null as any)).toThrow('Padding string must be a string. It cannot be an empty string.');
      //expect(() => truncString('test', 5, undefined as any)).toThrow('Padding string must be a string. It cannot be an empty string.');
      expect(() => truncString('test', 5, [] as any)).toThrow('Padding string must be a string. It cannot be an empty string.');
    });

    test('should throw error when pad is empty string', () => {
      expect(() => truncString('test', 5, '')).toThrow('Padding string must be a string. It cannot be an empty string.');
    });
  });

  describe('Performance and large inputs', () => {
    test('should handle large target lengths efficiently', () => {
      const result = truncString('test', 10000, 'x');
      expect(result).toHaveLength(10000);
      expect(result.startsWith('test')).toBe(true);
      expect(result.endsWith('x')).toBe(true);
    });

    test('should handle large strings efficiently', () => {
      const largeString = 'a'.repeat(100000);
      expect(truncString(largeString, 50)).toBe('a'.repeat(50));
      expect(truncString(largeString, -50)).toBe('a'.repeat(99950));
    });
  });
});