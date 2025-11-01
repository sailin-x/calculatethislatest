import { describe, it, expect } from 'vitest';
import {
  calculatePosteriorReturns,
  calculateOptimalWeights,
  calculateExpectedReturn,
  calculatePortfolioVolatility,
  calculateSharpeRatio
} from './formulas';
import { validateBlackLittermanInputs } from './validation';

describe('Black-Litterman Calculator', () => {
  const mockInputs = {
    marketWeights: [0.5, 0.3, 0.2],
    marketReturns: [7.5, 8.2, 6.8],
    marketCovariance: [[0.04, 0.02, 0.015], [0.02, 0.06, 0.025], [0.015, 0.025, 0.05]],
    investorViews: {
      assets: [0],
      returns: [10.5],
      confidences: [0.7]
    },
    riskAversion: 3.0,
    tau: 0.05
  };

  describe('Core Calculations', () => {
    it('calculates posterior returns correctly', () => {
      const result = calculatePosteriorReturns(mockInputs);
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(mockInputs.marketWeights.length);
      result.forEach(returnVal => {
        expect(typeof returnVal).toBe('number');
        expect(isFinite(returnVal)).toBe(true);
      });
    });

    it('calculates optimal weights correctly', () => {
      const result = calculateOptimalWeights(mockInputs);
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(mockInputs.marketWeights.length);
      const sum = result.reduce((a, b) => a + b, 0);
      expect(sum).toBeCloseTo(1, 1); // Weights should sum to approximately 1
    });

    it('calculates expected return correctly', () => {
      const result = calculateExpectedReturn(mockInputs);
      expect(typeof result).toBe('number');
      expect(isFinite(result)).toBe(true);
      expect(result).toBeGreaterThan(0);
    });

    it('calculates portfolio volatility correctly', () => {
      const result = calculatePortfolioVolatility(mockInputs);
      expect(typeof result).toBe('number');
      expect(isFinite(result)).toBe(true);
      expect(result).toBeGreaterThan(0);
    });

    it('calculates Sharpe ratio correctly', () => {
      const result = calculateSharpeRatio(mockInputs);
      expect(typeof result).toBe('number');
      expect(isFinite(result)).toBe(true);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateBlackLittermanInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates market weights array requirement', () => {
      const invalidInputs = { ...mockInputs, marketWeights: [] };
      const result = validateBlackLittermanInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates market weights sum to 1', () => {
      const invalidInputs = { ...mockInputs, marketWeights: [0.3, 0.3, 0.2] };
      const result = validateBlackLittermanInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates covariance matrix dimensions', () => {
      const invalidInputs = { ...mockInputs, marketCovariance: [[0.04, 0.02]] };
      const result = validateBlackLittermanInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates investor views structure', () => {
      const invalidInputs = { ...mockInputs, investorViews: { assets: [], returns: [], confidences: [] } };
      const result = validateBlackLittermanInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates risk aversion positivity', () => {
      const invalidInputs = { ...mockInputs, riskAversion: -1 };
      const result = validateBlackLittermanInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles single asset portfolio', () => {
      const singleAssetInputs = {
        marketWeights: [1.0],
        marketReturns: [8.0],
        marketCovariance: [[0.04]],
        investorViews: {
          assets: [0],
          returns: [9.0],
          confidences: [0.8]
        },
        riskAversion: 3.0,
        tau: 0.05
      };
      const result = calculateOptimalWeights(singleAssetInputs);
      expect(result).toEqual([1.0]);
    });

    it('handles high risk aversion', () => {
      const highRiskAversionInputs = { ...mockInputs, riskAversion: 10.0 };
      const result = calculateOptimalWeights(highRiskAversionInputs);
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(mockInputs.marketWeights.length);
    });

    it('handles low confidence views', () => {
      const lowConfidenceInputs = {
        ...mockInputs,
        investorViews: {
          ...mockInputs.investorViews,
          confidences: [0.1]
        }
      };
      const result = calculatePosteriorReturns(lowConfidenceInputs);
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('Business Logic', () => {
    it('posterior returns reflect investor views', () => {
      const result = calculatePosteriorReturns(mockInputs);
      // With a bullish view on asset 0, its posterior return should be higher
      expect(result[0]).toBeGreaterThan(mockInputs.marketReturns[0]);
    });

    it('optimal weights adjust based on views', () => {
      const result = calculateOptimalWeights(mockInputs);
      // Should overweight the asset with positive view
      expect(result[0]).toBeGreaterThan(mockInputs.marketWeights[0]);
    });

    it('higher risk aversion leads to more conservative weights', () => {
      const conservativeWeights = calculateOptimalWeights({ ...mockInputs, riskAversion: 5.0 });
      const aggressiveWeights = calculateOptimalWeights({ ...mockInputs, riskAversion: 1.0 });

      // Conservative portfolio should be closer to market weights
      const conservativeDeviation = conservativeWeights.reduce((sum, w, i) =>
        sum + Math.abs(w - mockInputs.marketWeights[i]), 0);
      const aggressiveDeviation = aggressiveWeights.reduce((sum, w, i) =>
        sum + Math.abs(w - mockInputs.marketWeights[i]), 0);

      expect(conservativeDeviation).toBeLessThanOrEqual(aggressiveDeviation);
    });
  });
});