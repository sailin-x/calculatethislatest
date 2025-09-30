import { describe, it, expect } from 'vitest';
import { calculateResult } from './formulas';
import { validatefund_level_irr_tvpi_and_dpi_calculatorInputs } from './validation';

describe('Fund Level IRR, TVPI, and DPI Calculator Calculator', () => {
  const mockInputs = { amount: 10000, rate: 0.05, time: 1 };

  describe('Core Calculations', () => {
    it('calculates result correctly', () => {
      const result = calculateResult(mockInputs);
      expect(result).toBe(500);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validatefund_level_irr_tvpi_and_dpi_calculatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates required fields', () => {
      const invalidInputs = { ...mockInputs, amount: 0 };
      const result = validatefund_level_irr_tvpi_and_dpi_calculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
