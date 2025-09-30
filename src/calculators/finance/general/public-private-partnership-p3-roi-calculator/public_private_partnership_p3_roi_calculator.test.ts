import { describe, it, expect } from 'vitest';
import { calculateResult } from './formulas';
import { validatepublic_private_partnership_p3_roi_calculatorInputs } from './validation';

describe('Public Private Partnership (P3) ROI Calculator Calculator', () => {
  const mockInputs = { amount: 10000, rate: 0.05, time: 1 };

  describe('Core Calculations', () => {
    it('calculates result correctly', () => {
      const result = calculateResult(mockInputs);
      expect(result).toBe(500);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validatepublic_private_partnership_p3_roi_calculatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates required fields', () => {
      const invalidInputs = { ...mockInputs, amount: 0 };
      const result = validatepublic_private_partnership_p3_roi_calculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
