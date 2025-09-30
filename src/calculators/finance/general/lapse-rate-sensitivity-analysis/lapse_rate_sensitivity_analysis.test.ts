import { describe, it, expect } from 'vitest';
import { calculateResult } from './formulas';
import { validatelapse_rate_sensitivity_analysisInputs } from './validation';

describe('Lapse Rate Sensitivity Analysis Calculator', () => {
  const mockInputs = { amount: 10000, rate: 0.05, time: 1 };

  describe('Core Calculations', () => {
    it('calculates result correctly', () => {
      const result = calculateResult(mockInputs);
      expect(result).toBe(500);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validatelapse_rate_sensitivity_analysisInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates required fields', () => {
      const invalidInputs = { ...mockInputs, amount: 0 };
      const result = validatelapse_rate_sensitivity_analysisInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
