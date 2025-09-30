import { describe, it, expect } from 'vitest';
import { calculateResult } from './formulas';
import { validatefela_settlement_calculator_railroadInputs } from './validation';

describe('FELA Settlement Calculator (Railroad) Calculator', () => {
  const mockInputs = { amount: 10000, rate: 0.05, time: 1 };

  describe('Core Calculations', () => {
    it('calculates result correctly', () => {
      const result = calculateResult(mockInputs);
      expect(result).toBe(500);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validatefela_settlement_calculator_railroadInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates required fields', () => {
      const invalidInputs = { ...mockInputs, amount: 0 };
      const result = validatefela_settlement_calculator_railroadInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
