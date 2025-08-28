import { StatisticsCalculator } from './StatisticsCalculator';

describe('StatisticsCalculator', () => {
  let calculator: StatisticsCalculator;

  beforeEach(() => {
    calculator = new StatisticsCalculator();
  });

  describe('calculate', () => {
    it('should calculate basic statistics correctly', () => {
      const inputs = {
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        confidenceLevel: 0.95,
        populationSize: 100,
        sampleSize: 10
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.mean).toBe(5.5);
      expect(result.median).toBe(5.5);
      expect(result.variance).toBeGreaterThan(0);
      expect(result.standardDeviation).toBeGreaterThan(0);
      expect(result.standardError).toBeGreaterThan(0);
      expect(result.skewness).toBeDefined();
      expect(result.kurtosis).toBeDefined();
      expect(result.range).toBe(9);
      expect(result.interquartileRange).toBeGreaterThan(0);
      expect(result.coefficientOfVariation).toBeGreaterThan(0);
      expect(result.confidenceInterval.lower).toBeLessThan(result.confidenceInterval.upper);
      expect(result.analysis).toBeDefined();
    });

    it('should handle weighted data', () => {
      const inputs = {
        data: [1, 2, 3, 4, 5],
        weights: [0.1, 0.2, 0.3, 0.2, 0.2],
        confidenceLevel: 0.90
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.mean).toBeGreaterThan(0);
      expect(result.variance).toBeGreaterThan(0);
      expect(result.standardDeviation).toBeGreaterThan(0);
      expect(result.analysis).toBeDefined();
    });

    it('should handle hypothesis testing', () => {
      const inputs = {
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        confidenceLevel: 0.95,
        hypothesisTest: {
          nullValue: 5,
          alternative: 'two-tailed' as const,
          significanceLevel: 0.05
        }
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.hypothesisTest).toBeDefined();
      expect(result.hypothesisTest!.testStatistic).toBeDefined();
      expect(result.hypothesisTest!.pValue).toBeGreaterThan(0);
      expect(result.hypothesisTest!.pValue).toBeLessThan(1);
      expect(result.hypothesisTest!.criticalValue).toBeDefined();
      expect(result.hypothesisTest!.decision).toBeDefined();
      expect(result.analysis).toBeDefined();
    });

    it('should handle regression analysis', () => {
      const inputs = {
        data: [1, 2, 3, 4, 5],
        confidenceLevel: 0.95,
        regression: {
          xValues: [1, 2, 3, 4, 5],
          yValues: [2, 4, 6, 8, 10]
        }
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.regression).toBeDefined();
      expect(result.regression!.slope).toBeCloseTo(2, 1);
      expect(result.regression!.intercept).toBeCloseTo(0, 1);
      expect(result.regression!.rSquared).toBeCloseTo(1, 1);
      expect(result.regression!.correlationCoefficient).toBeCloseTo(1, 1);
      expect(result.analysis).toBeDefined();
    });

    it('should handle empty data array', () => {
      const inputs = {
        data: [],
        confidenceLevel: 0.95
      };

      expect(() => calculator.calculate(inputs)).toThrow();
    });

    it('should handle single data point', () => {
      const inputs = {
        data: [5],
        confidenceLevel: 0.95
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.mean).toBe(5);
      expect(result.median).toBe(5);
      expect(result.variance).toBe(0);
      expect(result.standardDeviation).toBe(0);
      expect(result.analysis).toBeDefined();
    });
  });

  describe('validateInputs', () => {
    it('should validate required inputs', () => {
      const inputs = {
        data: [1, 2, 3, 4, 5],
        confidenceLevel: 0.95
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(true);
    });

    it('should reject invalid data array', () => {
      const inputs = {
        data: [1, 2, 'invalid', 4, 5] as any,
        confidenceLevel: 0.95
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Data element at index 2 must be a valid number');
    });

    it('should reject invalid confidence level', () => {
      const inputs = {
        data: [1, 2, 3, 4, 5],
        confidenceLevel: 1.5
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Confidence level must be between 0 and 1');
    });

    it('should reject mismatched weights array', () => {
      const inputs = {
        data: [1, 2, 3, 4, 5],
        weights: [0.1, 0.2, 0.3],
        confidenceLevel: 0.95
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Weights array length must match data array length');
    });

    it('should reject invalid hypothesis test', () => {
      const inputs = {
        data: [1, 2, 3, 4, 5],
        confidenceLevel: 0.95,
        hypothesisTest: {
          nullValue: 5,
          alternative: 'invalid' as any,
          significanceLevel: 0.05
        }
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Alternative must be one of: two-tailed, left-tailed, right-tailed');
    });
  });
});
