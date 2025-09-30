import { describe, it, expect } from 'vitest';
import { calculateResult } from './formulas';
import { validatead_agency_commission_vs_fee_model_calculatorInputs } from './validation';

describe('Ad Agency Commission vs. Fee Model Calculator Calculator', () => {
  const mockInputs = { amount: 10000, rate: 0.05, time: 1 };

  describe('Core Calculations', () => {
    it('calculates result correctly', () => {
      const result = calculateResult(mockInputs);
      expect(result).toBe(500);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validatead_agency_commission_vs_fee_model_calculatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates required fields', () => {
      const invalidInputs = { ...mockInputs, amount: 0 };
      const result = validatead_agency_commission_vs_fee_model_calculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
