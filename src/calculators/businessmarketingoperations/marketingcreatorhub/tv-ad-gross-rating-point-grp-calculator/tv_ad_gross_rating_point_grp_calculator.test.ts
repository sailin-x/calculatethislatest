import { describe, it, expect } from 'vitest';
import { calculateResult } from './formulas';
import { validatetv_ad_gross_rating_point_grp_calculatorInputs } from './validation';

describe('TV Ad Gross Rating Point (GRP) Calculator Calculator', () => {
  const mockInputs = { amount: 10000, rate: 0.05, time: 1 };

  describe('Core Calculations', () => {
    it('calculates result correctly', () => {
      const result = calculateResult(mockInputs);
      expect(result).toBe(500);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validatetv_ad_gross_rating_point_grp_calculatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates required fields', () => {
      const invalidInputs = { ...mockInputs, amount: 0 };
      const result = validatetv_ad_gross_rating_point_grp_calculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
