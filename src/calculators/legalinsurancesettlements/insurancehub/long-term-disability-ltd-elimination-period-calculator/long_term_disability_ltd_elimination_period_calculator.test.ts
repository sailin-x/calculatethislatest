import { describe, it, expect } from 'vitest';
import { calculateResult } from './formulas';
import { validatelong_term_disability_ltd_elimination_period_calculatorInputs } from './validation';

describe('Long Term Disability (LTD) Elimination Period Calculator Calculator', () => {
  const mockInputs = { amount: 10000, rate: 0.05, time: 1 };

  describe('Core Calculations', () => {
    it('calculates result correctly', () => {
      const result = calculateResult(mockInputs);
      expect(result).toBe(500);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validatelong_term_disability_ltd_elimination_period_calculatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates required fields', () => {
      const invalidInputs = { ...mockInputs, amount: 0 };
      const result = validatelong_term_disability_ltd_elimination_period_calculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
