import { describe, it, expect } from 'vitest';
import {
  calculateBeta,
  calculateAlpha,
  calculateRSquared,
  calculateCorrelationCoefficient,
  calculateVolatility
} from './formulas';
import { validateBetaInputs } from './validation';

describe('Beta Calculator', () => {
  const mockInputs = {
    stockReturns: [2.1, -3.4, 4.2, 1.8, -2.7, 3.9, 0.5, -1.2, 5.1, 2.3, -4.1, 3.7],
    marketReturns: [1.2, -2.1, 2.8, 1.1, -1.9, 2.5, 0.8, -0.9, 3.2, 1.7, -2.8, 2.1],
    riskFreeRate: 4.5,
    timePeriod: 'monthly' as const,
    benchmarkIndex: 'S&P 500',
    confidenceLevel: 95
  };

  describe('Core Calculations', () => {
    it('calculates beta correctly', () => {
      const result = calculateBeta(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeCloseTo(1.25, 1); // Approximate expected value
    });

    it('calculates alpha correctly', () => {
      const result = calculateAlpha(mockInputs);
      expect(typeof result).toBe('number');
      expect(isFinite(result)).toBe(true);
    });

    it('calculates R-squared correctly', () => {
      const result = calculateRSquared(mockInputs);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(1);
    });

    it('calculates correlation coefficient correctly', () => {
      const result = calculateCorrelationCoefficient(mockInputs);
      expect(result).toBeGreaterThanOrEqual(-1);
      expect(result).toBeLessThanOrEqual(1);
    });

    it('calculates volatility correctly', () => {
      const result = calculateVolatility(mockInputs);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateBetaInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates stock returns array requirement', () => {
      const invalidInputs = { ...mockInputs, stockReturns: [] };
      const result = validateBetaInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates market returns array requirement', () => {
      const invalidInputs = { ...mockInputs, marketReturns: [] };
      const result = validateBetaInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates equal array lengths', () => {
      const invalidInputs = { ...mockInputs, marketReturns: [1.2, -2.1] };
      const result = validateBetaInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates time period', () => {
      const invalidInputs = { ...mockInputs, timePeriod: 'hourly' as any };
      const result = validateBetaInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles defensive stock (beta < 1)', () => {
      const defensiveInputs = {
        ...mockInputs,
        stockReturns: [0.8, -1.2, 1.5, 0.9, -0.8, 1.3, 0.6, -0.5, 1.8, 1.1, -1.4, 1.2]
      };
      const result = calculateBeta(defensiveInputs);
      expect(result).toBeLessThan(1);
    });

    it('handles aggressive stock (beta > 1)', () => {
      const result = calculateBeta(mockInputs);
      expect(result).toBeGreaterThan(1);
    });

    it('handles negative beta', () => {
      const negativeBetaInputs = {
        ...mockInputs,
        stockReturns: mockInputs.marketReturns.map(r => -r * 0.8)
      };
      const result = calculateBeta(negativeBetaInputs);
      expect(result).toBeLessThan(0);
    });

    it('handles perfect correlation', () => {
      const perfectCorrInputs = {
        ...mockInputs,
        stockReturns: mockInputs.marketReturns.map(r => r * 1.5)
      };
      const correlation = calculateCorrelationCoefficient(perfectCorrInputs);
      expect(correlation).toBeCloseTo(1, 1);
    });
  });

  describe('Business Logic', () => {
    it('beta of 1 indicates market-like volatility', () => {
      const marketLikeInputs = {
        ...mockInputs,
        stockReturns: mockInputs.marketReturns
      };
      const result = calculateBeta(marketLikeInputs);
      expect(result).toBeCloseTo(1, 1);
    });

    it('correlation affects beta magnitude', () => {
      const highCorrInputs = {
        ...mockInputs,
        stockReturns: mockInputs.marketReturns.map(r => r * 2)
      };
      const lowCorrInputs = {
        ...mockInputs,
        stockReturns: [1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1]
      };
      const highBeta = calculateBeta(highCorrInputs);
      const lowBeta = calculateBeta(lowCorrInputs);
      expect(highBeta).toBeGreaterThan(Math.abs(lowBeta));
    });

    it('volatility scales with time period', () => {
      const monthlyVol = calculateVolatility(mockInputs);
      const annualVol = calculateVolatility({ ...mockInputs, timePeriod: 'yearly' as const });
      expect(annualVol).toBeLessThan(monthlyVol);
    });
  });
});