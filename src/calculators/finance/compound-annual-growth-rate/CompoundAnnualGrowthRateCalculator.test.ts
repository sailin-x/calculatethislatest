import { describe, it, expect } from 'vitest';
import { calculateCAGRResult } from './formulas';
import { validateCAGRInputs } from './validation';

describe('Compound Annual Growth Rate Calculator', () => {
  const mockInputs = {
    initialValue: 10000,
    finalValue: 25000,
    timePeriod: 10,
    timePeriodUnit: 'years' as const,
    inflationRate: 0.03,
    taxRate: 0.15
  };

  describe('Core CAGR Calculations', () => {
    it('calculates CAGR correctly', () => {
      const result = calculateCAGRResult(mockInputs);
      expect(result.cagr).toBeCloseTo(0.0948, 3); // Approximately 9.48%
    });

    it('calculates total return correctly', () => {
      const result = calculateCAGRResult(mockInputs);
      expect(result.totalReturn).toBe(15000);
    });

    it('calculates total return percentage correctly', () => {
      const result = calculateCAGRResult(mockInputs);
      expect(result.totalReturnPercentage).toBe(150);
    });

    it('calculates real CAGR (after inflation) correctly', () => {
      const result = calculateCAGRResult(mockInputs);
      expect(result.realCAGR).toBeCloseTo(0.0638, 3); // (1.0948 / 1.03) - 1
    });

    it('calculates after-tax CAGR correctly', () => {
      const result = calculateCAGRResult(mockInputs);
      expect(result.afterTaxCAGR).toBeCloseTo(0.0806, 3); // 0.0948 * (1 - 0.15)
    });

    it('calculates investment multiple correctly', () => {
      const result = calculateCAGRResult(mockInputs);
      expect(result.investmentMultiple).toBe(2.5);
    });
  });

  describe('Time Period Conversions', () => {
    it('handles months correctly', () => {
      const monthlyInputs = { ...mockInputs, timePeriod: 120, timePeriodUnit: 'months' as const };
      const result = calculateCAGRResult(monthlyInputs);
      expect(result.cagr).toBeCloseTo(0.0948, 3);
    });

    it('handles days correctly', () => {
      const dailyInputs = { ...mockInputs, timePeriod: 3650, timePeriodUnit: 'days' as const };
      const result = calculateCAGRResult(dailyInputs);
      expect(result.cagr).toBeCloseTo(0.0948, 3);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateCAGRInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates initial value cannot be zero', () => {
      const invalidInputs = { ...mockInputs, initialValue: 0 };
      const result = validateCAGRInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates final value cannot be zero', () => {
      const invalidInputs = { ...mockInputs, finalValue: 0 };
      const result = validateCAGRInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates time period cannot be zero', () => {
      const invalidInputs = { ...mockInputs, timePeriod: 0 };
      const result = validateCAGRInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates tax rate range', () => {
      const invalidInputs = { ...mockInputs, taxRate: 1.5 };
      const result = validateCAGRInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles negative growth', () => {
      const lossInputs = { ...mockInputs, finalValue: 5000 };
      const result = calculateCAGRResult(lossInputs);
      expect(result.cagr).toBeLessThan(0);
      expect(result.totalReturn).toBe(-5000);
    });

    it('handles very short time periods', () => {
      const shortInputs = { ...mockInputs, timePeriod: 0.1, timePeriodUnit: 'years' as const };
      const result = calculateCAGRResult(shortInputs);
      expect(result.cagr).toBeGreaterThan(0);
    });

    it('handles zero inflation', () => {
      const zeroInflationInputs = { ...mockInputs, inflationRate: 0 };
      const result = calculateCAGRResult(zeroInflationInputs);
      expect(result.realCAGR).toBe(result.cagr);
    });

    it('handles zero tax rate', () => {
      const zeroTaxInputs = { ...mockInputs, taxRate: 0 };
      const result = calculateCAGRResult(zeroTaxInputs);
      expect(result.afterTaxCAGR).toBe(result.cagr);
    });
  });

  describe('Additional Contributions', () => {
    it('handles additional contributions', () => {
      const contributionInputs = { ...mockInputs, additionalContributions: 1000 };
      const result = calculateCAGRResult(contributionInputs);
      expect(result.cagr).toBeDefined();
      // CAGR with contributions should be different from simple CAGR
    });
  });
});