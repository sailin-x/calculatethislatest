import { describe, it, expect } from 'vitest';
import { calculateResult } from './formulas';
import { validatebasal_metabolic_rate_bmr_calculatorInputs } from './validation';

describe('Basal Metabolic Rate (BMR) Calculator Calculator', () => {
  const mockInputs = { amount: 10000, rate: 0.05, time: 1 };

  describe('Core Calculations', () => {
    it('calculates result correctly', () => {
      const result = calculateResult(mockInputs);
      expect(result).toBe(500);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validatebasal_metabolic_rate_bmr_calculatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates required fields', () => {
      const invalidInputs = { ...mockInputs, amount: 0 };
      const result = validatebasal_metabolic_rate_bmr_calculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
