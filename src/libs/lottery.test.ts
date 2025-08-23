import { isValidProbabilityInput, lottery } from './lottery';

describe('isValidProbabilityInput', () => {
  describe('valid inputs', () => {
    it('should return true for valid probability inputs', () => {
      expect(isValidProbabilityInput(1, 2)).toBe(true);
      expect(isValidProbabilityInput(30, 100)).toBe(true);
      expect(isValidProbabilityInput(0, 100)).toBe(true);
      expect(isValidProbabilityInput(100, 100)).toBe(true);
    });

    it('should return true for edge cases with valid inputs', () => {
      expect(isValidProbabilityInput(0, 1)).toBe(true);
      expect(isValidProbabilityInput(1, 1)).toBe(true);
    });
  });

  describe('invalid inputs', () => {
    it('should return false for non-finite numbers', () => {
      expect(isValidProbabilityInput(NaN, 100)).toBe(false);
      expect(isValidProbabilityInput(100, NaN)).toBe(false);
      expect(isValidProbabilityInput(Infinity, 100)).toBe(false);
      expect(isValidProbabilityInput(100, Infinity)).toBe(false);
      expect(isValidProbabilityInput(-Infinity, 100)).toBe(false);
      expect(isValidProbabilityInput(100, -Infinity)).toBe(false);
    });

    it('should return false for negative probability', () => {
      expect(isValidProbabilityInput(-1, 100)).toBe(false);
      expect(isValidProbabilityInput(-0.1, 100)).toBe(false);
    });

    it('should return false for non-positive outOf values', () => {
      expect(isValidProbabilityInput(1, 0)).toBe(false);
      expect(isValidProbabilityInput(1, -1)).toBe(false);
      expect(isValidProbabilityInput(1, -100)).toBe(false);
    });

    it('should return false when probability is greater than outOf', () => {
      expect(isValidProbabilityInput(10, 5)).toBe(false);
      expect(isValidProbabilityInput(101, 100)).toBe(false);
      expect(isValidProbabilityInput(2, 1)).toBe(false);
    });
  });
});

describe('lottery', () => {
  describe('input validation', () => {
    it('should return false for invalid inputs', () => {
      expect(lottery(-1, 100)).toBe(false);
      expect(lottery(10, 5)).toBe(false);
      expect(lottery(NaN, 100)).toBe(false);
      expect(lottery(100, NaN)).toBe(false);
      expect(lottery(1, 0)).toBe(false);
      expect(lottery(1, -1)).toBe(false);
    });
  });

  describe('default parameters', () => {
    it('should use default values when no parameters provided', () => {
      // Mock Math.random to test default behavior
      const mockMath = jest.spyOn(Math, 'random');
      
      mockMath.mockReturnValue(0.005); // Less than 1/100 = 0.01
      expect(lottery()).toBe(true);
      
      mockMath.mockReturnValue(0.015); // Greater than 1/100 = 0.01
      expect(lottery()).toBe(false);
      
      mockMath.mockRestore();
    });
  });

  describe('probability behavior', () => {
    beforeEach(() => {
      // Reset any mocks before each test
      jest.restoreAllMocks();
    });

    it('should return true when random value is less than probability threshold', () => {
      const mockMath = jest.spyOn(Math, 'random');
      
      // Test 50% probability (1 out of 2)
      mockMath.mockReturnValue(0.49); // Less than 0.5
      expect(lottery(1, 2)).toBe(true);
      
      // Test 30% probability (30 out of 100)
      mockMath.mockReturnValue(0.29); // Less than 0.3
      expect(lottery(30, 100)).toBe(true);
      
      mockMath.mockRestore();
    });

    it('should return false when random value is greater than or equal to probability threshold', () => {
      const mockMath = jest.spyOn(Math, 'random');
      
      // Test 50% probability (1 out of 2)
      mockMath.mockReturnValue(0.5); // Equal to 0.5
      expect(lottery(1, 2)).toBe(false);
      
      mockMath.mockReturnValue(0.51); // Greater than 0.5
      expect(lottery(1, 2)).toBe(false);
      
      // Test 30% probability (30 out of 100)
      mockMath.mockReturnValue(0.3); // Equal to 0.3
      expect(lottery(30, 100)).toBe(false);
      
      mockMath.mockReturnValue(0.31); // Greater than 0.3
      expect(lottery(30, 100)).toBe(false);
      
      mockMath.mockRestore();
    });

    it('should handle edge cases correctly', () => {
      const mockMath = jest.spyOn(Math, 'random');
      
      // 0% probability (0 out of 100)
      mockMath.mockReturnValue(0.01);
      expect(lottery(0, 100)).toBe(false);
      
      // 100% probability (100 out of 100)
      mockMath.mockReturnValue(0.99);
      expect(lottery(100, 100)).toBe(true);
      
      mockMath.mockRestore();
    });
  });

  describe('statistical behavior', () => {
    it('should approximate expected probability over many iterations', () => {
      const iterations = 10000;
      const expectedProbability = 0.3; // 30%
      let successes = 0;
      
      for (let i = 0; i < iterations; i++) {
        if (lottery(30, 100)) {
          successes++;
        }
      }
      
      const actualProbability = successes / iterations;
      // Allow for some variance in random results (±5%)
      expect(actualProbability).toBeGreaterThan(expectedProbability - 0.05);
      expect(actualProbability).toBeLessThan(expectedProbability + 0.05);
    });

    it('should produce different results on multiple calls', () => {
      // Run lottery multiple times and ensure we get varied results
      const results: boolean[] = [];
      for (let i = 0; i < 100; i++) {
        results.push(lottery(50, 100)); // 50% chance
      }
      
      // We should have both true and false results (extremely unlikely to get all same)
      const trueCount = results.filter(r => r === true).length;
      const falseCount = results.filter(r => r === false).length;
      
      expect(trueCount).toBeGreaterThan(0);
      expect(falseCount).toBeGreaterThan(0);
    });
  });
});