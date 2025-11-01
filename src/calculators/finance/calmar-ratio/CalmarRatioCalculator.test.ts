import { describe, it, expect } from 'vitest';
import {
  calculateCalmarRatio,
  calculateAnnualizedReturn,
  calculateMaximumDrawdown,
  calculateSharpeRatio,
  calculateVolatility
} from './formulas';
import { validateCalmarRatioInputs } from './validation';

describe('Calmar Ratio Calculator', () => {
  const mockInputs = {
    portfolioValues: [10000, 10200, 10100, 10300, 10250, 10400, 10350, 10500, 10600, 10500, 10700, 10800],
    timePeriod: 'monthly' as const,
    riskFreeRate: 4.5
  };

  describe('Core Calculations', () => {
    it('calculates Calmar ratio correctly', () => {
      const result = calculateCalmarRatio(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(typeof result).toBe('number');
      expect(isFinite(result)).toBe(true);
    });

    it('calculates annualized return correctly', () => {
      const result = calculateAnnualizedReturn(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(typeof result).toBe('number');
      expect(isFinite(result)).toBe(true);
    });

    it('calculates maximum drawdown correctly', () => {
      const result = calculateMaximumDrawdown(mockInputs);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
      expect(typeof result).toBe('number');
    });

    it('calculates Sharpe ratio correctly', () => {
      const result = calculateSharpeRatio(mockInputs);
      expect(typeof result).toBe('number');
      expect(isFinite(result)).toBe(true);
    });

    it('calculates volatility correctly', () => {
      const result = calculateVolatility(mockInputs);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(typeof result).toBe('number');
      expect(isFinite(result)).toBe(true);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateCalmarRatioInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates portfolio values array requirement', () => {
      const invalidInputs = { ...mockInputs, portfolioValues: [] };
      const result = validateCalmarRatioInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates minimum data points', () => {
      const invalidInputs = { ...mockInputs, portfolioValues: [10000, 10200] };
      const result = validateCalmarRatioInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates positive portfolio values', () => {
      const invalidInputs = { ...mockInputs, portfolioValues: [10000, 0, 10200] };
      const result = validateCalmarRatioInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates time period', () => {
      const invalidInputs = { ...mockInputs, timePeriod: 'hourly' as any };
      const result = validateCalmarRatioInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles portfolio with no drawdowns', () => {
      const noDrawdownInputs = {
        ...mockInputs,
        portfolioValues: [10000, 10100, 10200, 10300, 10400, 10500]
      };
      const calmarRatio = calculateCalmarRatio(noDrawdownInputs);
      const maxDrawdown = calculateMaximumDrawdown(noDrawdownInputs);
      expect(maxDrawdown).toBe(0);
      expect(calmarRatio).toBe(0); // Division by zero case
    });

    it('handles volatile portfolio', () => {
      const volatileInputs = {
        ...mockInputs,
        portfolioValues: [10000, 12000, 8000, 15000, 6000, 18000, 14000, 20000]
      };
      const calmarRatio = calculateCalmarRatio(volatileInputs);
      const maxDrawdown = calculateMaximumDrawdown(volatileInputs);
      expect(maxDrawdown).toBeGreaterThan(0);
      expect(calmarRatio).toBeGreaterThan(0);
    });

    it('handles different time periods', () => {
      const dailyInputs = { ...mockInputs, timePeriod: 'daily' as const };
      const yearlyInputs = { ...mockInputs, timePeriod: 'yearly' as const };

      const dailyReturn = calculateAnnualizedReturn(dailyInputs);
      const yearlyReturn = calculateAnnualizedReturn(yearlyInputs);

      // Different time periods should give different annualized returns
      expect(dailyReturn).not.toBe(yearlyReturn);
    });

    it('handles negative risk-free rate', () => {
      const negativeRfInputs = { ...mockInputs, riskFreeRate: -1 };
      const result = calculateSharpeRatio(negativeRfInputs);
      expect(typeof result).toBe('number');
      expect(isFinite(result)).toBe(true);
    });
  });

  describe('Business Logic', () => {
    it('Calmar ratio decreases with higher drawdowns', () => {
      const lowDrawdown = calculateCalmarRatio(mockInputs);
      const highDrawdownInputs = {
        ...mockInputs,
        portfolioValues: [10000, 12000, 6000, 13000, 5500, 15000] // Higher drawdowns
      };
      const highDrawdown = calculateCalmarRatio(highDrawdownInputs);
      expect(highDrawdown).toBeLessThan(lowDrawdown);
    });

    it('higher returns improve Calmar ratio', () => {
      const original = calculateCalmarRatio(mockInputs);
      const higherReturnInputs = {
        ...mockInputs,
        portfolioValues: mockInputs.portfolioValues.map(v => v * 1.2) // 20% higher values
      };
      const higherReturn = calculateCalmarRatio(higherReturnInputs);
      expect(higherReturn).toBeGreaterThan(original);
    });

    it('Sharpe ratio considers risk-free rate', () => {
      const lowRfInputs = { ...mockInputs, riskFreeRate: 1 };
      const highRfInputs = { ...mockInputs, riskFreeRate: 8 };

      const lowRfSharpe = calculateSharpeRatio(lowRfInputs);
      const highRfSharpe = calculateSharpeRatio(highRfInputs);

      expect(highRfSharpe).toBeLessThan(lowRfSharpe);
    });
  });
});