import { describe, it, expect } from 'vitest';
import { calculateResult } from './formulas';
import { validatechapter_11_bankruptcy_plan_valuationInputs } from './validation';

describe('Chapter 11 Bankruptcy Plan Valuation Calculator', () => {
  const mockInputs = { amount: 10000, rate: 0.05, time: 1 };

  describe('Core Calculations', () => {
    it('calculates result correctly', () => {
      const result = calculateResult(mockInputs);
      expect(result).toBe(500);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validatechapter_11_bankruptcy_plan_valuationInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates required fields', () => {
      const invalidInputs = { ...mockInputs, amount: 0 };
      const result = validatechapter_11_bankruptcy_plan_valuationInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
