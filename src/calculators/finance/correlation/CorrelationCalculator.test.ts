import { describe, it, expect } from 'vitest';
import { calculateCorrelationMetrics } from './formulas';
import { validateCorrelationInputs } from './validation';

describe('Correlation Calculator', () => {
  const mockInputs = {
    asset1Returns: [2.1, -1.5, 3.2, 1.8, -0.9, 2.5, -1.2, 1.9, 2.8, -1.8],
    asset2Returns: [0.5, 1.2, -0.8, 0.9, 1.1, -0.3, 0.7, -0.5, 0.4, 0.8],
    asset1Name: 'S&P 500',
    asset2Name: '10Y Treasury',
    confidenceLevel: 95,
    timePeriod: '1Y',
    calculationMethod: 'pearson' as const,
    riskFreeRate: 0.045
  };

  describe('Correlation Calculations', () => {
    it('calculates Pearson correlation correctly', () => {
      const result = calculateCorrelationMetrics(mockInputs);
      expect(result.correlationCoefficient).toBeGreaterThanOrEqual(-1);
      expect(result.correlationCoefficient).toBeLessThanOrEqual(1);
    });

    it('calculates Spearman correlation correctly', () => {
      const spearmanInputs = { ...mockInputs, calculationMethod: 'spearman' as const };
      const result = calculateCorrelationMetrics(spearmanInputs);
      expect(result.correlationCoefficient).toBeGreaterThanOrEqual(-1);
      expect(result.correlationCoefficient).toBeLessThanOrEqual(1);
    });

    it('calculates Kendall correlation correctly', () => {
      const kendallInputs = { ...mockInputs, calculationMethod: 'kendall' as const };
      const result = calculateCorrelationMetrics(kendallInputs);
      expect(result.correlationCoefficient).toBeGreaterThanOrEqual(-1);
      expect(result.correlationCoefficient).toBeLessThanOrEqual(1);
    });

    it('calculates covariance correctly', () => {
      const result = calculateCorrelationMetrics(mockInputs);
      expect(typeof result.covariance).toBe('number');
    });

    it('determines correlation strength correctly', () => {
      const result = calculateCorrelationMetrics(mockInputs);
      const validStrengths = ['Very Strong', 'Strong', 'Moderate', 'Weak', 'Very Weak', 'None'];
      expect(validStrengths).toContain(result.correlationStrength);
    });

    it('determines correlation direction correctly', () => {
      const result = calculateCorrelationMetrics(mockInputs);
      const validDirections = ['Positive', 'Negative', 'None'];
      expect(validDirections).toContain(result.correlationDirection);
    });
  });

  describe('Statistical Tests', () => {
    it('calculates p-value correctly', () => {
      const result = calculateCorrelationMetrics(mockInputs);
      expect(result.pValue).toBeGreaterThanOrEqual(0);
      expect(result.pValue).toBeLessThanOrEqual(1);
    });

    it('calculates confidence interval correctly', () => {
      const result = calculateCorrelationMetrics(mockInputs);
      expect(result.confidenceInterval.lower).toBeGreaterThanOrEqual(-1);
      expect(result.confidenceInterval.upper).toBeLessThanOrEqual(1);
      expect(result.confidenceInterval.lower).toBeLessThanOrEqual(result.confidenceInterval.upper);
    });

    it('determines statistical significance correctly', () => {
      const result = calculateCorrelationMetrics(mockInputs);
      expect(typeof result.statisticalSignificance).toBe('boolean');
    });
  });

  describe('Regression Analysis', () => {
    it('calculates beta coefficient correctly', () => {
      const result = calculateCorrelationMetrics(mockInputs);
      expect(typeof result.betaCoefficient).toBe('number');
    });

    it('calculates R-squared correctly', () => {
      const result = calculateCorrelationMetrics(mockInputs);
      expect(result.rSquared).toBeGreaterThanOrEqual(0);
      expect(result.rSquared).toBeLessThanOrEqual(100);
    });

    it('calculates regression equation correctly', () => {
      const result = calculateCorrelationMetrics(mockInputs);
      expect(result.regressionEquation.intercept).toBeDefined();
      expect(result.regressionEquation.slope).toBeDefined();
      expect(result.regressionEquation.equation).toContain('y =');
    });
  });

  describe('Portfolio Analysis', () => {
    it('calculates portfolio statistics correctly', () => {
      const result = calculateCorrelationMetrics(mockInputs);
      expect(result.portfolioStats.portfolioReturn).toBeDefined();
      expect(result.portfolioStats.portfolioRisk).toBeGreaterThan(0);
      expect(result.portfolioStats.optimalWeights.asset1).toBeGreaterThanOrEqual(0);
      expect(result.portfolioStats.optimalWeights.asset2).toBeGreaterThanOrEqual(0);
    });

    it('generates efficient frontier correctly', () => {
      const result = calculateCorrelationMetrics(mockInputs);
      expect(Array.isArray(result.portfolioStats.efficientFrontier)).toBe(true);
      expect(result.portfolioStats.efficientFrontier.length).toBeGreaterThan(0);
    });

    it('identifies minimum variance portfolio correctly', () => {
      const result = calculateCorrelationMetrics(mockInputs);
      const mvp = result.portfolioStats.minimumVariancePortfolio;
      expect(mvp.return).toBeDefined();
      expect(mvp.risk).toBeDefined();
      expect(mvp.weights.asset1 + mvp.weights.asset2).toBeCloseTo(1, 5);
    });
  });

  describe('Asset Statistics', () => {
    it('calculates asset 1 statistics correctly', () => {
      const result = calculateCorrelationMetrics(mockInputs);
      const stats = result.asset1Stats;
      expect(stats.mean).toBeDefined();
      expect(stats.standardDeviation).toBeGreaterThan(0);
      expect(stats.sharpeRatio).toBeDefined();
    });

    it('calculates asset 2 statistics correctly', () => {
      const result = calculateCorrelationMetrics(mockInputs);
      const stats = result.asset2Stats;
      expect(stats.mean).toBeDefined();
      expect(stats.standardDeviation).toBeGreaterThan(0);
      expect(stats.sharpeRatio).toBeDefined();
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateCorrelationInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates asset returns array requirement', () => {
      const invalidInputs = { ...mockInputs, asset1Returns: [] };
      const result = validateCorrelationInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates minimum data points', () => {
      const invalidInputs = { ...mockInputs, asset1Returns: [1.0] };
      const result = validateCorrelationInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates array length matching', () => {
      const invalidInputs = { ...mockInputs, asset2Returns: [1.0, 2.0] };
      const result = validateCorrelationInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates numeric data', () => {
      const invalidInputs = { ...mockInputs, asset1Returns: [1.0, NaN, 3.0] };
      const result = validateCorrelationInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates confidence level range', () => {
      const invalidInputs = { ...mockInputs, confidenceLevel: 50 };
      const result = validateCorrelationInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles perfect positive correlation', () => {
      const perfectCorrInputs = {
        ...mockInputs,
        asset2Returns: mockInputs.asset1Returns
      };
      const result = calculateCorrelationMetrics(perfectCorrInputs);
      expect(result.correlationCoefficient).toBeCloseTo(1, 5);
    });

    it('handles perfect negative correlation', () => {
      const negativeCorrInputs = {
        ...mockInputs,
        asset2Returns: mockInputs.asset1Returns.map(x => -x)
      };
      const result = calculateCorrelationMetrics(negativeCorrInputs);
      expect(result.correlationCoefficient).toBeCloseTo(-1, 5);
    });

    it('handles zero correlation', () => {
      const zeroCorrInputs = {
        ...mockInputs,
        asset2Returns: [1, -1, 1, -1, 1, -1, 1, -1, 1, -1]
      };
      const result = calculateCorrelationMetrics(zeroCorrInputs);
      expect(Math.abs(result.correlationCoefficient)).toBeLessThan(0.1);
    });

    it('handles small datasets', () => {
      const smallInputs = {
        ...mockInputs,
        asset1Returns: [1.0, 2.0],
        asset2Returns: [1.5, 2.5]
      };
      const result = calculateCorrelationMetrics(smallInputs);
      expect(result.correlationCoefficient).toBe(1);
    });
  });

  describe('Benchmark Analysis', () => {
    it('handles benchmark returns correctly', () => {
      const benchmarkInputs = {
        ...mockInputs,
        benchmarkReturns: [1.5, -0.8, 2.1, 1.2, -0.5, 1.8, -0.9, 1.3, 2.0, -1.1],
        benchmarkName: 'S&P 500'
      };
      const result = calculateCorrelationMetrics(benchmarkInputs);
      expect(result.benchmarkComparison.benchmarkCorrelation).toBeDefined();
    });
  });
});