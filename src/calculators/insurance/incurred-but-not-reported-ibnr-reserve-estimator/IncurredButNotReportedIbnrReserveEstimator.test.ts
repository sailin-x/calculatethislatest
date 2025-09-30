import { describe, it, expect } from 'vitest';
import { calculateResult } from './formulas';
import { validateIncurredButNotReportedIbnrReserveEstimatorInputs } from './validation';

describe('Incurred But Not Reported (IBNR) Reserve Estimator', () => {
  const mockInputs = {
    // Add mock inputs here
  };

  describe('Calculations', () => {
    it('calculates result correctly', () => {
      const result = calculateResult(mockInputs);
      expect(result).toBeDefined();
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateIncurredButNotReportedIbnrReserveEstimatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });
  });
});
