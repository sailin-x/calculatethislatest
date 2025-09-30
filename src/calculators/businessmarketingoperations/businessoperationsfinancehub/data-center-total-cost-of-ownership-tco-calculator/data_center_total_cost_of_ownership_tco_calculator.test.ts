import { describe, it, expect } from 'vitest';
import { calculateResult } from './formulas';
import { validatedata_center_total_cost_of_ownership_tco_calculatorInputs } from './validation';

describe('Data Center Total Cost of Ownership (TCO) Calculator Calculator', () => {
  const mockInputs = { amount: 10000, rate: 0.05, time: 1 };

  describe('Core Calculations', () => {
    it('calculates result correctly', () => {
      const result = calculateResult(mockInputs);
      expect(result).toBe(500);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validatedata_center_total_cost_of_ownership_tco_calculatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates required fields', () => {
      const invalidInputs = { ...mockInputs, amount: 0 };
      const result = validatedata_center_total_cost_of_ownership_tco_calculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
