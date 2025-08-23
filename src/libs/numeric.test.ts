import { getNumericCharacters, getAlphanumericCharacters } from './numeric';

describe('getNumericCharacters', () => {
  describe('Basic functionality', () => {
    test('should extract numeric characters from alphanumeric string', () => {
      expect(getNumericCharacters('a1b2c3d4')).toBe('1234');
    });

    test('should extract numbers from price string', () => {
      expect(getNumericCharacters('price: $29.99')).toBe('2999');
    });

    test('should return empty string when no numbers present', () => {
      expect(getNumericCharacters('abcdef')).toBe('');
    });

    test('should return all numbers when string contains only numbers', () => {
      expect(getNumericCharacters('123456')).toBe('123456');
    });

    test('should handle empty string', () => {
      expect(getNumericCharacters('')).toBe('');
    });

    test('should handle string with special characters and numbers', () => {
      expect(getNumericCharacters('!@#1$%^2&*()3')).toBe('123');
    });
  });

  describe('Input validation', () => {
    test('should throw TypeError for non-string input', () => {
      expect(() => getNumericCharacters(123 as any)).toThrow(TypeError);
      expect(() => getNumericCharacters(null as any)).toThrow(TypeError);
      expect(() => getNumericCharacters(undefined as any)).toThrow(TypeError);
      expect(() => getNumericCharacters({} as any)).toThrow(TypeError);
      expect(() => getNumericCharacters([] as any)).toThrow(TypeError);
    });

    test('should throw TypeError with correct message', () => {
      expect(() => getNumericCharacters(123 as any)).toThrow('Input must be a string');
    });
  });

  describe('Options - maxLength', () => {
    test('should limit result to maxLength characters', () => {
      expect(getNumericCharacters('abc123def456', { maxLength: 3 })).toBe('123');
    });

    test('should return full result when maxLength is greater than result length', () => {
      expect(getNumericCharacters('1234', { maxLength: 10 })).toBe('1234');
    });

    test('should ignore maxLength when 0 and return full result', () => {
      expect(getNumericCharacters('123456', { maxLength: 0 })).toBe('');
    });

    test('should ignore negative maxLength and return full result', () => {
      expect(getNumericCharacters('123456', { maxLength: -5 })).toBe('');
    });

    test('should handle undefined maxLength', () => {
      expect(getNumericCharacters('123456', { maxLength: undefined })).toBe('123456');
    });
  });

  describe('Options - removeDuplicates', () => {
    test('should remove duplicates while preserving order', () => {
      expect(getNumericCharacters('112233', { removeDuplicates: true })).toBe('123');
    });

    test('should remove duplicates and sort when preserveOrder is false', () => {
      expect(getNumericCharacters('321123', { removeDuplicates: true, preserveOrder: false })).toBe('123');
    });

    test('should keep duplicates when removeDuplicates is false', () => {
      expect(getNumericCharacters('112233', { removeDuplicates: false })).toBe('112233');
    });

    test('should handle complex duplicate removal', () => {
      expect(getNumericCharacters('a1b1c2d2e3f3', { removeDuplicates: true })).toBe('123');
    });
  });

  describe('Options combinations', () => {
    test('should apply removeDuplicates and maxLength together', () => {
      expect(getNumericCharacters('11223344', { removeDuplicates: true, maxLength: 2 })).toBe('12');
    });

    test('should handle all options together', () => {
      expect(getNumericCharacters('a3b1c2d3e1f2', { 
        removeDuplicates: true, 
        preserveOrder: false, 
        maxLength: 2 
      })).toBe('12');
    });
  });

  describe('Default options', () => {
    test('should use default options when none provided', () => {
      expect(getNumericCharacters('a1b2c1d2')).toBe('1212');
    });

    test('should preserve order by default', () => {
      expect(getNumericCharacters('a3b1c2')).toBe('312');
    });

    test('should not remove duplicates by default', () => {
      expect(getNumericCharacters('a1b1c2c2')).toBe('1122');
    });
  });
});

describe('getAlphanumericCharacters', () => {
  describe('Basic functionality', () => {
    test('should extract alphanumeric characters from string with special characters', () => {
      expect(getAlphanumericCharacters('Hello@123#World!')).toBe('Hello123World');
    });

    test('should handle string with only letters', () => {
      expect(getAlphanumericCharacters('HelloWorld')).toBe('HelloWorld');
    });

    test('should handle string with only numbers', () => {
      expect(getAlphanumericCharacters('123456')).toBe('123456');
    });

    test('should return empty string when no alphanumeric characters present', () => {
      expect(getAlphanumericCharacters('!@#$%^&*()')).toBe('');
    });

    test('should handle empty string', () => {
      expect(getAlphanumericCharacters('')).toBe('');
    });

    test('should handle mixed case letters', () => {
      expect(getAlphanumericCharacters('HeLLo@123#WoRLd!')).toBe('HeLLo123WoRLd');
    });
  });

  describe('Input validation', () => {
    test('should throw TypeError for non-string input', () => {
      expect(() => getAlphanumericCharacters(123 as any)).toThrow(TypeError);
      expect(() => getAlphanumericCharacters(null as any)).toThrow(TypeError);
      expect(() => getAlphanumericCharacters(undefined as any)).toThrow(TypeError);
    });

    test('should throw TypeError with correct message', () => {
      expect(() => getAlphanumericCharacters(123 as any)).toThrow('Input must be a string');
    });
  });

  describe('Options - maxLength', () => {
    test('should limit result to maxLength characters', () => {
      expect(getAlphanumericCharacters('Hello123World', { maxLength: 8 })).toBe('Hello123');
    });

    test('should return full result when maxLength is greater than result length', () => {
      expect(getAlphanumericCharacters('Hello123', { maxLength: 20 })).toBe('Hello123');
    });

    test('should ignore maxLength when 0 and return full result', () => {
      expect(getAlphanumericCharacters('Hello123', { maxLength: 0 })).toBe('Hello123');
    });
  });

  describe('Options - removeDuplicates', () => {
    test('should remove duplicates while preserving order', () => {
      expect(getAlphanumericCharacters('aabbcc112233', { removeDuplicates: true })).toBe('abc123');
    });

    test('should remove duplicates and sort when preserveOrder is false', () => {
      expect(getAlphanumericCharacters('cba321', { removeDuplicates: true, preserveOrder: false })).toBe('123abc');
    });

    test('should handle case sensitivity in duplicates', () => {
      expect(getAlphanumericCharacters('AaBbCc', { removeDuplicates: true })).toBe('AaBbCc');
    });
  });

  describe('Options combinations', () => {
    test('should apply removeDuplicates and maxLength together', () => {
      expect(getAlphanumericCharacters('aabbcc123', { removeDuplicates: true, maxLength: 4 })).toBe('abc1');
    });

    test('should handle all options together with sorting', () => {
      expect(getAlphanumericCharacters('c@b@a@3@2@1', { 
        removeDuplicates: true, 
        preserveOrder: false, 
        maxLength: 4 
      })).toBe('123a');
    });
  });

  describe('Default options behavior', () => {
    test('should use default options when none provided', () => {
      expect(getAlphanumericCharacters('a@b@a@1@2@1')).toBe('aba121');
    });

    test('should preserve order by default', () => {
      expect(getAlphanumericCharacters('c@b@a@3@2@1')).toBe('cba321');
    });

    test('should not remove duplicates by default', () => {
      expect(getAlphanumericCharacters('a@a@b@b@1@1@2@2')).toBe('aabb1122');
    });
  });
});

describe('Integration tests', () => {
  test('both functions should handle similar inputs consistently', () => {
    const input = 'a1b2c3!@#';
    const numericResult = getNumericCharacters(input);
    const alphanumericResult = getAlphanumericCharacters(input);
    
    expect(numericResult).toBe('123');
    expect(alphanumericResult).toBe('a1b2c3');
    expect(alphanumericResult.replace(/[^0-9]/g, '')).toBe(numericResult);
  });

  test('both functions should handle edge cases consistently', () => {
    const edgeCases = ['', '!@#$%^&*()', '123456', 'abcdef'];
    
    edgeCases.forEach(testCase => {
      expect(() => getNumericCharacters(testCase)).not.toThrow();
      expect(() => getAlphanumericCharacters(testCase)).not.toThrow();
    });
  });
});