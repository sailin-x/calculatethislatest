import { describe, it, expect } from 'vitest';
import { calculateResult } from './formulas';
import { validateincurred_but_not_reported_ibnr_reserve_estimatorInputs } from './validation';

describe('Incurred But Not Reported (IBNR) Reserve Estimator Calculator', () => {
  const mockInputs = { amount: 10000, rate: 0.05, time: 1 };

  describe('Core Calculations', () => {
    it('calculates result correctly', () => {
      const result = calculateResult(mockInputs);
      expect(result).toBe(500);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateincurred_but_not_reported_ibnr_reserve_estimatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates required fields', () => {
      const invalidInputs = { ...mockInputs, amount: 0 };
      const result = validateincurred_but_not_reported_ibnr_reserve_estimatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
