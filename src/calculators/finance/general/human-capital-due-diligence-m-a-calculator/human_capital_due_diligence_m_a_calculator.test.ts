import { describe, it, expect } from 'vitest';
import { calculateResult } from './formulas';
import { validatehuman_capital_due_diligence_m_a_calculatorInputs } from './validation';

describe('Human Capital Due Diligence (M&A) Calculator Calculator', () => {
  const mockInputs = { amount: 10000, rate: 0.05, time: 1 };

  describe('Core Calculations', () => {
    it('calculates result correctly', () => {
      const result = calculateResult(mockInputs);
      expect(result).toBe(500);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validatehuman_capital_due_diligence_m_a_calculatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates required fields', () => {
      const invalidInputs = { ...mockInputs, amount: 0 };
      const result = validatehuman_capital_due_diligence_m_a_calculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
