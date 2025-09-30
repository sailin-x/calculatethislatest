import { describe, it, expect } from 'vitest';
import { calculateResult } from './formulas';
import { validaterestricted_stock_unit_rsu_vs_stock_option_calculatorInputs } from './validation';

describe('Restricted Stock Unit (RSU) vs. Stock Option Calculator Calculator', () => {
  const mockInputs = { amount: 10000, rate: 0.05, time: 1 };

  describe('Core Calculations', () => {
    it('calculates result correctly', () => {
      const result = calculateResult(mockInputs);
      expect(result).toBe(500);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validaterestricted_stock_unit_rsu_vs_stock_option_calculatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates required fields', () => {
      const invalidInputs = { ...mockInputs, amount: 0 };
      const result = validaterestricted_stock_unit_rsu_vs_stock_option_calculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
