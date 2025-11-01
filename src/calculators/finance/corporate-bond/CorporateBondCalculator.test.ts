import { describe, it, expect } from 'vitest';
import { calculateCorporateBondMetrics } from './formulas';
import { validateCorporateBondInputs } from './validation';

describe('Corporate Bond Calculator', () => {
  const mockInputs = {
    faceValue: 1000,
    couponRate: 5,
    marketPrice: 1050,
    yearsToMaturity: 10,
    yieldToMaturity: 4.5,
    couponFrequency: 2,
    creditRating: 'AAA',
    taxRate: 30,
    marketRiskPremium: 6,
    beta: 0.8,
    riskFreeRate: 4.0
  };

  describe('Core Bond Calculations', () => {
    it('calculates current yield correctly', () => {
      const result = calculateCorporateBondMetrics(mockInputs);
      const expected = (1000 * 5 / 100) / 1050 * 100;
      expect(result.currentYield).toBeCloseTo(expected, 2);
    });

    it('calculates yield to maturity correctly', () => {
      const result = calculateCorporateBondMetrics(mockInputs);
      expect(result.yieldToMaturity).toBeGreaterThan(0);
      expect(result.yieldToMaturity).toBeLessThan(20);
    });

    it('calculates duration correctly', () => {
      const result = calculateCorporateBondMetrics(mockInputs);
      expect(result.duration).toBeGreaterThan(0);
      expect(result.duration).toBeLessThanOrEqual(mockInputs.yearsToMaturity);
    });

    it('calculates convexity correctly', () => {
      const result = calculateCorporateBondMetrics(mockInputs);
      expect(result.convexity).toBeGreaterThan(0);
    });

    it('calculates credit spread correctly', () => {
      const result = calculateCorporateBondMetrics(mockInputs);
      expect(result.creditSpread).toBe(mockInputs.yieldToMaturity - mockInputs.riskFreeRate);
    });
  });

  describe('Risk Calculations', () => {
    it('calculates default probability based on rating', () => {
      const result = calculateCorporateBondMetrics(mockInputs);
      expect(result.defaultProbability).toBeGreaterThanOrEqual(0);
      expect(result.defaultProbability).toBeLessThanOrEqual(1);
    });

    it('calculates expected loss correctly', () => {
      const result = calculateCorporateBondMetrics(mockInputs);
      expect(result.expectedLoss).toBeGreaterThanOrEqual(0);
    });

    it('calculates value at risk correctly', () => {
      const result = calculateCorporateBondMetrics(mockInputs);
      expect(result.valueAtRisk).toBeLessThan(0); // VaR is typically negative
    });
  });

  describe('Return Calculations', () => {
    it('calculates total return correctly', () => {
      const result = calculateCorporateBondMetrics(mockInputs);
      expect(result.totalReturn).toBeGreaterThan(0);
    });

    it('calculates annualized return correctly', () => {
      const result = calculateCorporateBondMetrics(mockInputs);
      expect(result.annualizedReturn).toBeGreaterThan(0);
    });

    it('calculates Sharpe ratio correctly', () => {
      const result = calculateCorporateBondMetrics(mockInputs);
      expect(result.sharpeRatio).toBeDefined();
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateCorporateBondInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates face value cannot be negative', () => {
      const invalidInputs = { ...mockInputs, faceValue: -100 };
      const result = validateCorporateBondInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates coupon rate range', () => {
      const invalidInputs = { ...mockInputs, couponRate: 60 };
      const result = validateCorporateBondInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates credit rating', () => {
      const invalidInputs = { ...mockInputs, creditRating: 'INVALID' };
      const result = validateCorporateBondInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates beta range', () => {
      const invalidInputs = { ...mockInputs, beta: 10 };
      const result = validateCorporateBondInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero coupon bonds', () => {
      const zeroCouponInputs = { ...mockInputs, couponRate: 0 };
      const result = calculateCorporateBondMetrics(zeroCouponInputs);
      expect(result.currentYield).toBe(0);
    });

    it('handles high yield bonds', () => {
      const highYieldInputs = { ...mockInputs, creditRating: 'CCC', yieldToMaturity: 12 };
      const result = calculateCorporateBondMetrics(highYieldInputs);
      expect(result.defaultProbability).toBeGreaterThan(0.1);
    });

    it('handles long maturity bonds', () => {
      const longBondInputs = { ...mockInputs, yearsToMaturity: 30 };
      const result = calculateCorporateBondMetrics(longBondInputs);
      expect(result.duration).toBeGreaterThan(10);
    });

    it('handles premium bonds', () => {
      const premiumInputs = { ...mockInputs, marketPrice: 1200 };
      const result = calculateCorporateBondMetrics(premiumInputs);
      expect(premiumInputs.marketPrice).toBeGreaterThan(mockInputs.faceValue);
    });

    it('handles discount bonds', () => {
      const discountInputs = { ...mockInputs, marketPrice: 800 };
      const result = calculateCorporateBondMetrics(discountInputs);
      expect(discountInputs.marketPrice).toBeLessThan(mockInputs.faceValue);
    });
  });

  describe('Scenario Analysis', () => {
    it('calculates rate shock scenarios', () => {
      const result = calculateCorporateBondMetrics(mockInputs);
      expect(result.scenarioAnalysis.rateUp100bps).toBeLessThan(mockInputs.marketPrice);
      expect(result.scenarioAnalysis.rateDown100bps).toBeGreaterThan(mockInputs.marketPrice);
    });

    it('calculates stress test results', () => {
      const result = calculateCorporateBondMetrics(mockInputs);
      expect(result.stressTestResults.severeRecession).toBeLessThan(mockInputs.marketPrice);
      expect(result.stressTestResults.normalConditions).toBe(mockInputs.marketPrice);
    });
  });

  describe('Tax Analysis', () => {
    it('calculates after-tax yield correctly', () => {
      const result = calculateCorporateBondMetrics(mockInputs);
      expect(result.afterTaxYield).toBeLessThan(result.yieldToMaturity);
    });

    it('calculates tax equivalent yield', () => {
      const result = calculateCorporateBondMetrics(mockInputs);
      expect(result.taxAnalysis.taxableEquivalentYield).toBeGreaterThan(result.yieldToMaturity);
    });
  });
});