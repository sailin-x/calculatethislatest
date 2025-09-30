import { describe, it, expect } from 'vitest';
import { calculateResult } from './formulas';
import { validatedisability_insurance_needs_calculatorInputs } from './validation';

describe('Disability Insurance Needs Calculator Calculator', () => {
  const mockInputs = { amount: 10000, rate: 0.05, time: 1 };

  describe('Core Calculations', () => {
    it('calculates result correctly', () => {
      const result = calculateResult(mockInputs);
      expect(result).toBe(500);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validatedisability_insurance_needs_calculatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates required fields', () => {
      const invalidInputs = { ...mockInputs, amount: 0 };
      const result = validatedisability_insurance_needs_calculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
