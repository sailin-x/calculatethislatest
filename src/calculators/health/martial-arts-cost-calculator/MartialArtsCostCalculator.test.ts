import { describe, it, expect } from 'vitest';
import { calculateResult } from './formulas';
import { validateMartialArtsCostCalculatorInputs } from './validation';

describe('Martial Arts Cost Calculator', () => {
  const mockInputs = {
    inputValue: 10,
    multiplier: 5
  };

  describe('Calculations', () => {
    it('calculates result correctly', () => {
      const result = calculateResult(mockInputs);
      expect(result).toBe(50);
    });

    it('handles zero multiplication', () => {
      const zeroInputs = { ...mockInputs, multiplier: 0 };
      const result = calculateResult(zeroInputs);
      expect(result).toBe(0);
    });

    it('handles large numbers', () => {
      const largeInputs = { inputValue: 1000, multiplier: 1000 };
      const result = calculateResult(largeInputs);
      expect(result).toBe(1000000);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateMartialArtsCostCalculatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates negative numbers', () => {
      const invalidInputs = { ...mockInputs, inputValue: -5 };
      const result = validateMartialArtsCostCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates NaN values', () => {
      const invalidInputs = { ...mockInputs, inputValue: NaN };
      const result = validateMartialArtsCostCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles decimal inputs', () => {
      const decimalInputs = { inputValue: 3.5, multiplier: 2.0 };
      const result = calculateResult(decimalInputs);
      expect(result).toBe(7.0);
    });

    it('handles very small numbers', () => {
      const smallInputs = { inputValue: 0.001, multiplier: 0.001 };
      const result = calculateResult(smallInputs);
      expect(result).toBeCloseTo(0.000001, 6);
    });
  });
});
