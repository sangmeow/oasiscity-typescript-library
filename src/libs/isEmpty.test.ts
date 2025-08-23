import {
  isEmpty,
  isNotEmpty,
  setZeroIfEmpty,
  setOneIfEmpty,
  setDefaultIfEmpty,
  isNotEmptyGuard
} from './isEmpty';

describe('isEmpty utility functions', () => {
  describe('isEmpty', () => {
    it('should return true for null and undefined', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
    });

    it('should return true for empty strings and whitespace-only strings', () => {
      expect(isEmpty('')).toBe(true);
      expect(isEmpty('   ')).toBe(true);
      expect(isEmpty('\t')).toBe(true);
      expect(isEmpty('\n')).toBe(true);
      expect(isEmpty('  \t\n  ')).toBe(true);
    });

    it('should return false for non-empty strings', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty('0')).toBe(false);
      expect(isEmpty(' hello ')).toBe(false);
    });

    it('should return true for NaN and false for other numbers', () => {
      expect(isEmpty(NaN)).toBe(true);
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty(-1)).toBe(false);
      expect(isEmpty(42)).toBe(false);
      expect(isEmpty(0.5)).toBe(false);
      expect(isEmpty(Infinity)).toBe(false);
      expect(isEmpty(-Infinity)).toBe(false);
    });

    it('should return true for empty arrays and false for non-empty arrays', () => {
      expect(isEmpty([])).toBe(true);
      expect(isEmpty([1])).toBe(false);
      expect(isEmpty([1, 2, 3])).toBe(false);
      expect(isEmpty([''])).toBe(false); // array with empty string is not empty
    });

    it('should handle Map objects correctly', () => {
      expect(isEmpty(new Map())).toBe(true);
      expect(isEmpty(new Map([['key', 'value']]))).toBe(false);
    });

    it('should handle Set objects correctly', () => {
      expect(isEmpty(new Set())).toBe(true);
      expect(isEmpty(new Set([1, 2, 3]))).toBe(false);
    });

    it('should handle Date objects correctly', () => {
      expect(isEmpty(new Date('invalid'))).toBe(true);
      expect(isEmpty(new Date())).toBe(false);
      expect(isEmpty(new Date('2023-01-01'))).toBe(false);
    });

    it('should return true for empty plain objects and false for non-empty objects', () => {
      expect(isEmpty({})).toBe(true);
      expect(isEmpty({ a: 1 })).toBe(false);
      expect(isEmpty({ a: undefined })).toBe(false); // object with property is not empty
    });

    it('should return false for other types', () => {
      expect(isEmpty(true)).toBe(false);
      expect(isEmpty(false)).toBe(false);
      expect(isEmpty(() => {})).toBe(false);
      expect(isEmpty(Symbol('test'))).toBe(false);
      expect(isEmpty(new Error('test'))).toBe(false);
      expect(isEmpty(/regex/)).toBe(false);
    });
  });

  describe('isNotEmpty', () => {
    it('should return false for empty values', () => {
      expect(isNotEmpty(null)).toBe(false);
      expect(isNotEmpty(undefined)).toBe(false);
      expect(isNotEmpty('')).toBe(false);
      expect(isNotEmpty('   ')).toBe(false);
      expect(isNotEmpty([])).toBe(false);
      expect(isNotEmpty({})).toBe(false);
      expect(isNotEmpty(NaN)).toBe(false);
      expect(isNotEmpty(new Date('invalid'))).toBe(false);
    });

    it('should return true for non-empty values', () => {
      expect(isNotEmpty('hello')).toBe(true);
      expect(isNotEmpty(0)).toBe(true);
      expect(isNotEmpty(false)).toBe(true);
      expect(isNotEmpty([1, 2, 3])).toBe(true);
      expect(isNotEmpty({ a: 1 })).toBe(true);
      expect(isNotEmpty(new Date())).toBe(true);
    });
  });

  describe('setZeroIfEmpty', () => {
    it('should return 0 for empty values', () => {
      expect(setZeroIfEmpty(null)).toBe(0);
      expect(setZeroIfEmpty(undefined)).toBe(0);
      expect(setZeroIfEmpty('')).toBe(0);
      expect(setZeroIfEmpty('   ')).toBe(0);
      expect(setZeroIfEmpty([])).toBe(0);
      expect(setZeroIfEmpty({})).toBe(0);
      expect(setZeroIfEmpty(NaN)).toBe(0);
    });

    it('should return original value for non-empty values', () => {
      expect(setZeroIfEmpty('hello')).toBe('hello');
      expect(setZeroIfEmpty(42)).toBe(42);
      expect(setZeroIfEmpty(false)).toBe(false);
      expect(setZeroIfEmpty([1, 2, 3])).toEqual([1, 2, 3]);
      expect(setZeroIfEmpty({ a: 1 })).toEqual({ a: 1 });
    });
  });

  describe('setOneIfEmpty', () => {
    it('should return 1 for empty values', () => {
      expect(setOneIfEmpty(null)).toBe(1);
      expect(setOneIfEmpty(undefined)).toBe(1);
      expect(setOneIfEmpty('')).toBe(1);
      expect(setOneIfEmpty('   ')).toBe(1);
      expect(setOneIfEmpty([])).toBe(1);
      expect(setOneIfEmpty({})).toBe(1);
      expect(setOneIfEmpty(NaN)).toBe(1);
    });

    it('should return original value for non-empty values', () => {
      expect(setOneIfEmpty('hello')).toBe('hello');
      expect(setOneIfEmpty(42)).toBe(42);
      expect(setOneIfEmpty(0)).toBe(0);
      expect(setOneIfEmpty(false)).toBe(false);
      expect(setOneIfEmpty([1, 2, 3])).toEqual([1, 2, 3]);
      expect(setOneIfEmpty({ a: 1 })).toEqual({ a: 1 });
    });
  });

  describe('setDefaultIfEmpty', () => {
    it('should return default value for empty values', () => {
      expect(setDefaultIfEmpty(null, 'default')).toBe('default');
      expect(setDefaultIfEmpty(undefined, 'fallback')).toBe('fallback');
      expect(setDefaultIfEmpty('', 'empty string')).toBe('empty string');
      expect(setDefaultIfEmpty('   ', 'whitespace')).toBe('whitespace');
      expect(setDefaultIfEmpty([], 'empty array')).toBe('empty array');
      expect(setDefaultIfEmpty({}, 'empty object')).toBe('empty object');
      expect(setDefaultIfEmpty(NaN, 'not a number')).toBe('not a number');
    });

    it('should return original value for non-empty values', () => {
      expect(setDefaultIfEmpty('hello', 'default')).toBe('hello');
      expect(setDefaultIfEmpty(42, 'default')).toBe(42);
      expect(setDefaultIfEmpty(0, 'default')).toBe(0);
      expect(setDefaultIfEmpty(false, 'default')).toBe(false);
      expect(setDefaultIfEmpty([1, 2, 3], 'default')).toEqual([1, 2, 3]);
      expect(setDefaultIfEmpty({ a: 1 }, 'default')).toEqual({ a: 1 });
    });

    it('should handle different types of default values', () => {
      expect(setDefaultIfEmpty(null, 42)).toBe(42);
      expect(setDefaultIfEmpty(null, [])).toEqual([]);
      expect(setDefaultIfEmpty(null, {})).toEqual({});
      expect(setDefaultIfEmpty(null, true)).toBe(true);
    });
  });

  describe('isNotEmptyGuard', () => {
    it('should return false for empty values', () => {
      expect(isNotEmptyGuard(null)).toBe(false);
      expect(isNotEmptyGuard(undefined)).toBe(false);
      expect(isNotEmptyGuard('')).toBe(false);
      expect(isNotEmptyGuard('   ')).toBe(false);
      expect(isNotEmptyGuard([])).toBe(false);
      expect(isNotEmptyGuard({})).toBe(false);
      expect(isNotEmptyGuard(NaN)).toBe(false);
    });

    it('should return true for non-empty values', () => {
      expect(isNotEmptyGuard('hello')).toBe(true);
      expect(isNotEmptyGuard(0)).toBe(true);
      expect(isNotEmptyGuard(false)).toBe(true);
      expect(isNotEmptyGuard([1, 2, 3])).toBe(true);
      expect(isNotEmptyGuard({ a: 1 })).toBe(true);
      expect(isNotEmptyGuard(new Date())).toBe(true);
    });

    it('should work as a type guard in TypeScript', () => {
      // 이 테스트는 타입 체킹을 위한 것이므로 런타임에서는 동작 확인만 가능합니다
      const value: string | null | undefined = 'hello';
      
      if (isNotEmptyGuard(value)) {
        // TypeScript에서 여기서 value는 string 타입으로 추론됩니다
        expect(typeof value).toBe('string');
        expect(value.length).toBeGreaterThan(0);
      }
      
      const nullValue: string | null | undefined = null;
      expect(isNotEmptyGuard(nullValue)).toBe(false);
    });
  });

  describe('edge cases and complex scenarios', () => {
    it('should handle nested empty objects and arrays', () => {
      expect(isEmpty([{}])).toBe(false); // array with empty object is not empty
      expect(isEmpty({ a: [] })).toBe(false); // object with empty array is not empty
      expect(isEmpty([null])).toBe(false); // array with null is not empty
    });

    it('should handle special string cases', () => {
      expect(isEmpty('0')).toBe(false);
      expect(isEmpty('false')).toBe(false);
      expect(isEmpty('null')).toBe(false);
      expect(isEmpty('undefined')).toBe(false);
    });

    it('should handle Map and Set with falsy values', () => {
      const mapWithFalsy = new Map();
      mapWithFalsy.set('key', 0);
      expect(isEmpty(mapWithFalsy)).toBe(false);

      const setWithFalsy = new Set([0, false, '']);
      expect(isEmpty(setWithFalsy)).toBe(false);
    });

    it('should handle custom objects (non-plain objects)', () => {
      class CustomClass {
        constructor(public value: number) {}
      }
      
      const customInstance = new CustomClass(42);
      expect(isEmpty(customInstance)).toBe(false);
      
      const emptyCustomInstance = new CustomClass(0);
      expect(isEmpty(emptyCustomInstance)).toBe(false); // still not empty because it's not a plain object
    });

    it('should consistently handle WeakMap and WeakSet', () => {
      // WeakMap and WeakSet are not plain objects, Maps, or Sets
      // so they should be treated as non-empty
      expect(isEmpty(new WeakMap())).toBe(false);
      expect(isEmpty(new WeakSet())).toBe(false);
    });
  });
});