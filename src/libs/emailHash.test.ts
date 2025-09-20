import { emailHash } from './emailHash';

describe('emailHash', () => {
  describe('valid email inputs', () => {
    it('should return correct hash for simple email', () => {
      // 'abc' → a=0, b=1, c=2 → (0+1+2) % 26 = 3
      expect(emailHash('abc@example.com')).toBe(3);
    });

    it('should return correct hash for single character', () => {
      // 'a' → a=0 → 0 % 26 = 0
      expect(emailHash('a@domain.org')).toBe(0);
    });

    it('should return correct hash for 26 character sum', () => {
      // 'z' → z=25 → 25 % 26 = 25
      expect(emailHash('z@test.com')).toBe(25);
    });

    it('should handle mixed case letters', () => {
      // 'AbC' → a=0, b=1, c=2 → (0+1+2) % 26 = 3
      expect(emailHash('AbC@example.com')).toBe(3);
    });

    it('should ignore non-alphabetic characters', () => {
      // 'a1b2c' → a=0, b=1, c=2 → (0+1+2) % 26 = 3
      expect(emailHash('a1b2c@example.com')).toBe(3);
    });

    it('should handle special characters in local part', () => {
      // 'test.user+tag' → t=19, e=4, s=18, t=19, u=20, s=18, e=4, r=17, t=19, a=0, g=6
      // → (19+4+18+19+20+18+4+17+19+0+6) % 26 = 144 % 26 = 14
      expect(emailHash('test.user+tag@example.com')).toBe(14);
    });

    it('should return same result for identical emails', () => {
      const email = 'test@example.com';
      expect(emailHash(email)).toBe(emailHash(email));
    });
  });

  describe('input validation', () => {
    it('should throw error for empty string', () => {
      expect(() => emailHash('')).toThrow('Email must be a non-empty string');
    });

    it('should throw error for null input', () => {
      expect(() => emailHash(null as any)).toThrow('Email must be a non-empty string');
    });

    it('should throw error for undefined input', () => {
      expect(() => emailHash(undefined as any)).toThrow('Email must be a non-empty string');
    });

    it('should throw error for non-string input', () => {
      expect(() => emailHash(123 as any)).toThrow('Email must be a non-empty string');
    });

    it('should throw error for invalid email format - missing @', () => {
      expect(() => emailHash('testexample.com')).toThrow('Invalid email format');
    });

    it('should throw error for invalid email format - missing domain', () => {
      expect(() => emailHash('test@')).toThrow('Invalid email format');
    });

    it('should throw error for invalid email format - missing local part', () => {
      expect(() => emailHash('@example.com')).toThrow('Invalid email format');
    });

    it('should throw error for invalid email format - missing TLD', () => {
      expect(() => emailHash('test@example')).toThrow('Invalid email format');
    });

    it('should throw error for invalid email format - spaces', () => {
      expect(() => emailHash('test @example.com')).toThrow('Invalid email format');
      expect(() => emailHash('test@ example.com')).toThrow('Invalid email format');
    });

    it('should throw error for invalid email format - multiple @', () => {
      expect(() => emailHash('test@@example.com')).toThrow('Invalid email format');
      expect(() => emailHash('te@st@example.com')).toThrow('Invalid email format');
    });
  });

  describe('edge cases', () => {
    it('should handle very long local part', () => {
      const longLocal = 'a'.repeat(64); // Maximum local part length
      const result = emailHash(`${longLocal}@example.com`);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(26);
    });

    it('should handle local part with no alphabetic characters', () => {
      // '123456' → no alphabetic chars → sum=0 → 0 % 26 = 0
      expect(emailHash('123456@example.com')).toBe(0);
    });

    it('should handle complex email addresses', () => {
      const complexEmail = 'user.name+tag123@subdomain.example.co.uk';
      const result = emailHash(complexEmail);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(26);
    });
  });

  describe('return value constraints', () => {
    it('should always return a number between 0 and 25', () => {
      const testEmails = [
        'a@test.com',
        'z@test.com',
        'abcdefghijklmnopqrstuvwxyz@test.com',
        'test123@example.org',
        'user.name@domain.co.uk'
      ];

      testEmails.forEach(email => {
        const result = emailHash(email);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThan(26);
        expect(Number.isInteger(result)).toBe(true);
      });
    });
  });
});