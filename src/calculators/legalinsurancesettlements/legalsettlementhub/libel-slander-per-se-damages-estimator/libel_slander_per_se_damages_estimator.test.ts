import { describe, it, expect } from 'vitest';
import { calculateResult } from './formulas';
import { validatelibel_slander_per_se_damages_estimatorInputs } from './validation';

describe('Libel/Slander Per Se Damages Estimator Calculator', () => {
  const mockInputs = { amount: 10000, rate: 0.05, time: 1 };

  describe('Core Calculations', () => {
    it('calculates result correctly', () => {
      const result = calculateResult(mockInputs);
      expect(result).toBe(500);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validatelibel_slander_per_se_damages_estimatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates required fields', () => {
      const invalidInputs = { ...mockInputs, amount: 0 };
      const result = validatelibel_slander_per_se_damages_estimatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
