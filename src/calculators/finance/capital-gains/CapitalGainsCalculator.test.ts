import { describe, it, expect } from 'vitest';
import {
  calculateCapitalGain,
  calculateNetCapitalGain,
  calculateTaxOwed,
  calculateAfterTaxGain,
  calculateTotalReturn,
  calculateHoldingPeriodDays,
  calculateHoldingPeriodYears
} from './formulas';
import { validateCapitalGainsInputs } from './validation';

describe('Capital Gains Calculator', () => {
  const mockInputs = {
    acquisitionPrice: 100,
    salePrice: 120,
    quantity: 100,
    acquisitionDate: '2023-01-01',
    saleDate: '2024-01-01',
    acquisitionCosts: 50,
    saleCosts: 50,
    taxRate: 15,
    inflationRate: 2.5,
    holdingPeriod: 'long' as const
  };

  describe('Core Calculations', () => {
    it('calculates capital gain correctly', () => {
      const result = calculateCapitalGain(mockInputs);
      expect(result).toBe(2000); // (120 - 100) * 100
    });

    it('calculates net capital gain correctly', () => {
      const result = calculateNetCapitalGain(mockInputs);
      expect(result).toBe(1900); // 2000 - 50 - 50
    });

    it('calculates tax owed correctly', () => {
      const result = calculateTaxOwed(mockInputs);
      expect(result).toBe(142.5); // 1900 * 0.5 * 0.15 (long-term rate)
    });

    it('calculates after-tax gain correctly', () => {
      const result = calculateAfterTaxGain(mockInputs);
      expect(result).toBe(1757.5); // 1900 - 142.5
    });

    it('calculates total return correctly', () => {
      const result = calculateTotalReturn(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(typeof result).toBe('number');
      expect(isFinite(result)).toBe(true);
    });

    it('calculates holding period days correctly', () => {
      const result = calculateHoldingPeriodDays(mockInputs);
      expect(result).toBe(366); // 2024-01-01 - 2023-01-01 (leap year)
    });

    it('calculates holding period years correctly', () => {
      const result = calculateHoldingPeriodYears(mockInputs);
      expect(result).toBeCloseTo(1.0027, 3); // Approximately 1 year
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateCapitalGainsInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates acquisition price requirements', () => {
      const invalidInputs = { ...mockInputs, acquisitionPrice: 0 };
      const result = validateCapitalGainsInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates sale price requirements', () => {
      const invalidInputs = { ...mockInputs, salePrice: -10 };
      const result = validateCapitalGainsInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates date order', () => {
      const invalidInputs = { ...mockInputs, saleDate: '2022-01-01' };
      const result = validateCapitalGainsInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates quantity requirements', () => {
      const invalidInputs = { ...mockInputs, quantity: 0 };
      const result = validateCapitalGainsInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates tax rate range', () => {
      const invalidInputs = { ...mockInputs, taxRate: 60 };
      const result = validateCapitalGainsInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles capital losses', () => {
      const lossInputs = { ...mockInputs, salePrice: 80 };
      const netGain = calculateNetCapitalGain(lossInputs);
      const taxOwed = calculateTaxOwed(lossInputs);
      expect(netGain).toBeLessThan(0);
      expect(taxOwed).toBe(0); // No tax on losses
    });

    it('handles zero tax rate', () => {
      const zeroTaxInputs = { ...mockInputs, taxRate: 0 };
      const taxOwed = calculateTaxOwed(zeroTaxInputs);
      expect(taxOwed).toBe(0);
    });

    it('handles short-term holdings', () => {
      const shortTermInputs = {
        ...mockInputs,
        acquisitionDate: '2023-12-01',
        saleDate: '2023-12-15',
        holdingPeriod: 'short' as const
      };
      const taxOwed = calculateTaxOwed(shortTermInputs);
      expect(taxOwed).toBe(285); // 1900 * 0.15 (no long-term discount)
    });

    it('handles very long holding periods', () => {
      const longTermInputs = {
        ...mockInputs,
        acquisitionDate: '2000-01-01',
        saleDate: '2024-01-01'
      };
      const holdingYears = calculateHoldingPeriodYears(longTermInputs);
      expect(holdingYears).toBeGreaterThan(20);
    });

    it('handles high inflation', () => {
      const highInflationInputs = { ...mockInputs, inflationRate: 10 };
      const result = calculateTotalReturn(highInflationInputs);
      expect(typeof result).toBe('number');
      expect(isFinite(result)).toBe(true);
    });
  });

  describe('Business Logic', () => {
    it('long-term gains have tax advantage', () => {
      const longTermTax = calculateTaxOwed({ ...mockInputs, holdingPeriod: 'long' });
      const shortTermTax = calculateTaxOwed({ ...mockInputs, holdingPeriod: 'short' });
      expect(longTermTax).toBeLessThan(shortTermTax);
    });

    it('higher tax rates increase tax owed', () => {
      const lowTax = calculateTaxOwed({ ...mockInputs, taxRate: 10 });
      const highTax = calculateTaxOwed({ ...mockInputs, taxRate: 20 });
      expect(highTax).toBeGreaterThan(lowTax);
    });

    it('transaction costs reduce net gain', () => {
      const noCosts = calculateNetCapitalGain({ ...mockInputs, acquisitionCosts: 0, saleCosts: 0 });
      const withCosts = calculateNetCapitalGain(mockInputs);
      expect(noCosts).toBeGreaterThan(withCosts);
    });

    it('holding period affects total return', () => {
      const shortHolding = calculateTotalReturn({
        ...mockInputs,
        acquisitionDate: '2023-06-01',
        saleDate: '2023-12-01'
      });
      const longHolding = calculateTotalReturn(mockInputs);
      // Different holding periods should give different total returns
      expect(shortHolding).not.toBe(longHolding);
    });
  });
});