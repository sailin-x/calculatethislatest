import { describe, it, expect } from 'vitest';
import { calculateResult } from './formulas';
import { validatetotal_cost_of_ownership_tco_for_commercial_fleet_calculatorInputs } from './validation';

describe('Total Cost of Ownership (TCO) for Commercial Fleet Calculator Calculator', () => {
  const mockInputs = { amount: 10000, rate: 0.05, time: 1 };

  describe('Core Calculations', () => {
    it('calculates result correctly', () => {
      const result = calculateResult(mockInputs);
      expect(result).toBe(500);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validatetotal_cost_of_ownership_tco_for_commercial_fleet_calculatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates required fields', () => {
      const invalidInputs = { ...mockInputs, amount: 0 };
      const result = validatetotal_cost_of_ownership_tco_for_commercial_fleet_calculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
