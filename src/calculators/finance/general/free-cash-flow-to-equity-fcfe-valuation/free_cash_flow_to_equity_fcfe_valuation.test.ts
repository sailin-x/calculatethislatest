import { describe, it, expect } from 'vitest';
import { calculateResult } from './formulas';
import { validatefree_cash_flow_to_equity_fcfe_valuationInputs } from './validation';

describe('Free Cash Flow to Equity (FCFE) Valuation Calculator', () => {
  const mockInputs = { amount: 10000, rate: 0.05, time: 1 };

  describe('Core Calculations', () => {
    it('calculates result correctly', () => {
      const result = calculateResult(mockInputs);
      expect(result).toBe(500);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validatefree_cash_flow_to_equity_fcfe_valuationInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates required fields', () => {
      const invalidInputs = { ...mockInputs, amount: 0 };
      const result = validatefree_cash_flow_to_equity_fcfe_valuationInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
