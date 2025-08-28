import { BalancedScorecardCalculator } from './BalancedScorecardCalculator';

describe('BalancedScorecardCalculator', () => {
  let calculator: BalancedScorecardCalculator;

  beforeEach(() => {
    calculator = new BalancedScorecardCalculator();
  });

  describe('calculate', () => {
    it('should calculate balanced scorecard metrics correctly', () => {
      const inputs = {
        financialMetrics: {
          revenue: 1000000,
          profitMargin: 0.15,
          returnOnInvestment: 0.12,
          cashFlow: 200000
        },
        customerMetrics: {
          customerSatisfaction: 0.85,
          customerRetention: 0.90,
          marketShare: 0.25,
          customerAcquisitionCost: 500
        },
        internalProcessMetrics: {
          processEfficiency: 0.80,
          qualityScore: 0.92,
          cycleTime: 30,
          defectRate: 0.05
        },
        learningGrowthMetrics: {
          employeeSatisfaction: 0.75,
          trainingHours: 40,
          innovationIndex: 0.70,
          skillDevelopment: 0.80
        }
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.overallScore).toBeGreaterThan(0);
      expect(result.overallScore).toBeLessThanOrEqual(100);
      expect(result.financialScore).toBeGreaterThan(0);
      expect(result.customerScore).toBeGreaterThan(0);
      expect(result.processScore).toBeGreaterThan(0);
      expect(result.growthScore).toBeGreaterThan(0);
      expect(result.recommendations).toBeDefined();
    });

    it('should handle zero values', () => {
      const inputs = {
        financialMetrics: {
          revenue: 0,
          profitMargin: 0,
          returnOnInvestment: 0,
          cashFlow: 0
        },
        customerMetrics: {
          customerSatisfaction: 0,
          customerRetention: 0,
          marketShare: 0,
          customerAcquisitionCost: 0
        },
        internalProcessMetrics: {
          processEfficiency: 0,
          qualityScore: 0,
          cycleTime: 0,
          defectRate: 0
        },
        learningGrowthMetrics: {
          employeeSatisfaction: 0,
          trainingHours: 0,
          innovationIndex: 0,
          skillDevelopment: 0
        }
      };

      const result = calculator.calculate(inputs);

      expect(result.overallScore).toBe(0);
      expect(result.financialScore).toBe(0);
      expect(result.customerScore).toBe(0);
      expect(result.processScore).toBe(0);
      expect(result.growthScore).toBe(0);
    });

    it('should handle perfect scores', () => {
      const inputs = {
        financialMetrics: {
          revenue: 1000000,
          profitMargin: 1.0,
          returnOnInvestment: 1.0,
          cashFlow: 1000000
        },
        customerMetrics: {
          customerSatisfaction: 1.0,
          customerRetention: 1.0,
          marketShare: 1.0,
          customerAcquisitionCost: 0
        },
        internalProcessMetrics: {
          processEfficiency: 1.0,
          qualityScore: 1.0,
          cycleTime: 0,
          defectRate: 0
        },
        learningGrowthMetrics: {
          employeeSatisfaction: 1.0,
          trainingHours: 100,
          innovationIndex: 1.0,
          skillDevelopment: 1.0
        }
      };

      const result = calculator.calculate(inputs);

      expect(result.overallScore).toBe(100);
      expect(result.financialScore).toBe(100);
      expect(result.customerScore).toBe(100);
      expect(result.processScore).toBe(100);
      expect(result.growthScore).toBe(100);
    });
  });

  describe('validateInputs', () => {
    it('should validate required inputs', () => {
      const inputs = {
        financialMetrics: {
          revenue: 1000000,
          profitMargin: 0.15,
          returnOnInvestment: 0.12,
          cashFlow: 200000
        },
        customerMetrics: {
          customerSatisfaction: 0.85,
          customerRetention: 0.90,
          marketShare: 0.25,
          customerAcquisitionCost: 500
        },
        internalProcessMetrics: {
          processEfficiency: 0.80,
          qualityScore: 0.92,
          cycleTime: 30,
          defectRate: 0.05
        },
        learningGrowthMetrics: {
          employeeSatisfaction: 0.75,
          trainingHours: 40,
          innovationIndex: 0.70,
          skillDevelopment: 0.80
        }
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(true);
    });

    it('should reject negative values', () => {
      const inputs = {
        financialMetrics: {
          revenue: -1000000,
          profitMargin: 0.15,
          returnOnInvestment: 0.12,
          cashFlow: 200000
        },
        customerMetrics: {
          customerSatisfaction: 0.85,
          customerRetention: 0.90,
          marketShare: 0.25,
          customerAcquisitionCost: 500
        },
        internalProcessMetrics: {
          processEfficiency: 0.80,
          qualityScore: 0.92,
          cycleTime: 30,
          defectRate: 0.05
        },
        learningGrowthMetrics: {
          employeeSatisfaction: 0.75,
          trainingHours: 40,
          innovationIndex: 0.70,
          skillDevelopment: 0.80
        }
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Revenue must be positive');
    });
  });
});
