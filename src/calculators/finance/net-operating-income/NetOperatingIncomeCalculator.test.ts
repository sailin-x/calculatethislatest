import { NetOperatingIncomeCalculator } from './NetOperatingIncomeCalculator';
import { NetOperatingIncomeInputs } from './types';

describe('NetOperatingIncomeCalculator', () => {
  let calculator: NetOperatingIncomeCalculator;

  beforeEach(() => {
    calculator = new NetOperatingIncomeCalculator();
  });

  describe('Basic NOI Calculation', () => {
    it('should calculate NOI for a simple residential property', () => {
      const inputs: NetOperatingIncomeInputs = {
        propertyInfo: {
          propertyType: 'residential',
          totalUnits: 10,
          totalSquareFeet: 10000,
          propertyAge: 5,
          location: 'urban'
        },
        income: {
          baseRent: 1200,
          additionalIncome: 200,
          vacancyRate: 0.05,
          collectionLossRate: 0.02
        },
        expenses: {
          propertyManagement: 100,
          maintenance: 150,
          utilities: 80,
          insurance: 120,
          propertyTaxes: 200,
          marketing: 50,
          legal: 30,
          accounting: 40,
          otherOperatingExpenses: 100
        },
        marketData: {
          marketRent: 1250,
          marketVacancyRate: 0.06,
          marketExpenseRatio: 0.35
        }
      };

      const result = calculator.calculate(inputs);

      expect(result.netOperatingIncome).toBeGreaterThan(0);
      expect(result.effectiveGrossIncome).toBeGreaterThan(result.netOperatingIncome);
      expect(result.totalOperatingExpenses).toBeGreaterThan(0);
      expect(result.noiMargin).toBeGreaterThan(0);
      expect(result.expenseRatio).toBeGreaterThan(0);
      expect(result.vacancyRate).toBe(0.05);
    });

    it('should calculate NOI for a commercial property', () => {
      const inputs: NetOperatingIncomeInputs = {
        propertyInfo: {
          propertyType: 'commercial',
          totalUnits: 1,
          totalSquareFeet: 5000,
          propertyAge: 10,
          location: 'suburban'
        },
        income: {
          baseRent: 5000,
          additionalIncome: 500,
          vacancyRate: 0.08,
          collectionLossRate: 0.01
        },
        expenses: {
          propertyManagement: 300,
          maintenance: 400,
          utilities: 200,
          insurance: 250,
          propertyTaxes: 600,
          marketing: 100,
          legal: 50,
          accounting: 75,
          otherOperatingExpenses: 200
        },
        marketData: {
          marketRent: 5200,
          marketVacancyRate: 0.07,
          marketExpenseRatio: 0.30
        }
      };

      const result = calculator.calculate(inputs);

      expect(result.netOperatingIncome).toBeGreaterThan(0);
      expect(result.effectiveGrossIncome).toBeGreaterThan(result.netOperatingIncome);
      expect(result.totalOperatingExpenses).toBeGreaterThan(0);
      expect(result.noiMargin).toBeGreaterThan(0);
      expect(result.expenseRatio).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero vacancy rate', () => {
      const inputs: NetOperatingIncomeInputs = {
        propertyInfo: {
          propertyType: 'residential',
          totalUnits: 5,
          totalSquareFeet: 5000,
          propertyAge: 3,
          location: 'urban'
        },
        income: {
          baseRent: 1000,
          additionalIncome: 100,
          vacancyRate: 0,
          collectionLossRate: 0.01
        },
        expenses: {
          propertyManagement: 50,
          maintenance: 75,
          utilities: 40,
          insurance: 60,
          propertyTaxes: 100,
          marketing: 25,
          legal: 15,
          accounting: 20,
          otherOperatingExpenses: 50
        },
        marketData: {
          marketRent: 1050,
          marketVacancyRate: 0.05,
          marketExpenseRatio: 0.40
        }
      };

      const result = calculator.calculate(inputs);
      expect(result.vacancyRate).toBe(0);
      expect(result.vacancyLoss).toBe(0);
      expect(result.effectiveGrossIncome).toBe(result.totalGrossIncome - result.collectionLoss);
    });

    it('should handle high vacancy rate', () => {
      const inputs: NetOperatingIncomeInputs = {
        propertyInfo: {
          propertyType: 'residential',
          totalUnits: 8,
          totalSquareFeet: 8000,
          propertyAge: 15,
          location: 'rural'
        },
        income: {
          baseRent: 800,
          additionalIncome: 80,
          vacancyRate: 0.25,
          collectionLossRate: 0.05
        },
        expenses: {
          propertyManagement: 40,
          maintenance: 60,
          utilities: 32,
          insurance: 48,
          propertyTaxes: 80,
          marketing: 20,
          legal: 12,
          accounting: 16,
          otherOperatingExpenses: 40
        },
        marketData: {
          marketRent: 850,
          marketVacancyRate: 0.20,
          marketExpenseRatio: 0.45
        }
      };

      const result = calculator.calculate(inputs);
      expect(result.vacancyRate).toBe(0.25);
      expect(result.vacancyLoss).toBeGreaterThan(0);
      expect(result.effectiveGrossIncome).toBeLessThan(result.totalGrossIncome);
    });

    it('should handle zero additional income', () => {
      const inputs: NetOperatingIncomeInputs = {
        propertyInfo: {
          propertyType: 'residential',
          totalUnits: 6,
          totalSquareFeet: 6000,
          propertyAge: 8,
          location: 'urban'
        },
        income: {
          baseRent: 1100,
          additionalIncome: 0,
          vacancyRate: 0.03,
          collectionLossRate: 0.01
        },
        expenses: {
          propertyManagement: 55,
          maintenance: 82,
          utilities: 44,
          insurance: 66,
          propertyTaxes: 110,
          marketing: 27,
          legal: 16,
          accounting: 22,
          otherOperatingExpenses: 55
        },
        marketData: {
          marketRent: 1150,
          marketVacancyRate: 0.04,
          marketExpenseRatio: 0.38
        }
      };

      const result = calculator.calculate(inputs);
      expect(result.totalGrossIncome).toBe(result.incomeBreakdown.baseRent);
      expect(result.incomeBreakdown.additionalIncome).toBe(0);
    });
  });

  describe('Validation', () => {
    it('should throw error for negative base rent', () => {
      const inputs: NetOperatingIncomeInputs = {
        propertyInfo: {
          propertyType: 'residential',
          totalUnits: 5,
          totalSquareFeet: 5000,
          propertyAge: 5,
          location: 'urban'
        },
        income: {
          baseRent: -1000,
          additionalIncome: 100,
          vacancyRate: 0.05,
          collectionLossRate: 0.02
        },
        expenses: {
          propertyManagement: 50,
          maintenance: 75,
          utilities: 40,
          insurance: 60,
          propertyTaxes: 100,
          marketing: 25,
          legal: 15,
          accounting: 20,
          otherOperatingExpenses: 50
        },
        marketData: {
          marketRent: 1050,
          marketVacancyRate: 0.05,
          marketExpenseRatio: 0.40
        }
      };

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });

    it('should throw error for negative total units', () => {
      const inputs: NetOperatingIncomeInputs = {
        propertyInfo: {
          propertyType: 'residential',
          totalUnits: -5,
          totalSquareFeet: 5000,
          propertyAge: 5,
          location: 'urban'
        },
        income: {
          baseRent: 1000,
          additionalIncome: 100,
          vacancyRate: 0.05,
          collectionLossRate: 0.02
        },
        expenses: {
          propertyManagement: 50,
          maintenance: 75,
          utilities: 40,
          insurance: 60,
          propertyTaxes: 100,
          marketing: 25,
          legal: 15,
          accounting: 20,
          otherOperatingExpenses: 50
        },
        marketData: {
          marketRent: 1050,
          marketVacancyRate: 0.05,
          marketExpenseRatio: 0.40
        }
      };

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });

    it('should throw error for vacancy rate greater than 1', () => {
      const inputs: NetOperatingIncomeInputs = {
        propertyInfo: {
          propertyType: 'residential',
          totalUnits: 5,
          totalSquareFeet: 5000,
          propertyAge: 5,
          location: 'urban'
        },
        income: {
          baseRent: 1000,
          additionalIncome: 100,
          vacancyRate: 1.5,
          collectionLossRate: 0.02
        },
        expenses: {
          propertyManagement: 50,
          maintenance: 75,
          utilities: 40,
          insurance: 60,
          propertyTaxes: 100,
          marketing: 25,
          legal: 15,
          accounting: 20,
          otherOperatingExpenses: 50
        },
        marketData: {
          marketRent: 1050,
          marketVacancyRate: 0.05,
          marketExpenseRatio: 0.40
        }
      };

      expect(() => calculator.calculate(inputs)).toThrow('Validation failed');
    });
  });

  describe('Per Unit Calculations', () => {
    it('should calculate per unit metrics correctly', () => {
      const inputs: NetOperatingIncomeInputs = {
        propertyInfo: {
          propertyType: 'residential',
          totalUnits: 10,
          totalSquareFeet: 10000,
          propertyAge: 5,
          location: 'urban'
        },
        income: {
          baseRent: 1200,
          additionalIncome: 200,
          vacancyRate: 0.05,
          collectionLossRate: 0.02
        },
        expenses: {
          propertyManagement: 100,
          maintenance: 150,
          utilities: 80,
          insurance: 120,
          propertyTaxes: 200,
          marketing: 50,
          legal: 30,
          accounting: 40,
          otherOperatingExpenses: 100
        },
        marketData: {
          marketRent: 1250,
          marketVacancyRate: 0.06,
          marketExpenseRatio: 0.35
        }
      };

      const result = calculator.calculate(inputs);

      expect(result.noiPerUnit).toBeCloseTo(result.netOperatingIncome / 10, 2);
      expect(result.grossIncomePerUnit).toBeCloseTo(result.totalGrossIncome / 10, 2);
      expect(result.expensesPerUnit).toBeCloseTo(result.totalOperatingExpenses / 10, 2);
    });
  });

  describe('Per Square Foot Calculations', () => {
    it('should calculate per square foot metrics correctly', () => {
      const inputs: NetOperatingIncomeInputs = {
        propertyInfo: {
          propertyType: 'commercial',
          totalUnits: 1,
          totalSquareFeet: 5000,
          propertyAge: 10,
          location: 'suburban'
        },
        income: {
          baseRent: 5000,
          additionalIncome: 500,
          vacancyRate: 0.08,
          collectionLossRate: 0.01
        },
        expenses: {
          propertyManagement: 300,
          maintenance: 400,
          utilities: 200,
          insurance: 250,
          propertyTaxes: 600,
          marketing: 100,
          legal: 50,
          accounting: 75,
          otherOperatingExpenses: 200
        },
        marketData: {
          marketRent: 5200,
          marketVacancyRate: 0.07,
          marketExpenseRatio: 0.30
        }
      };

      const result = calculator.calculate(inputs);

      expect(result.noiPerSqFt).toBeCloseTo(result.netOperatingIncome / 5000, 2);
      expect(result.grossIncomePerSqFt).toBeCloseTo(result.totalGrossIncome / 5000, 2);
      expect(result.expensesPerSqFt).toBeCloseTo(result.totalOperatingExpenses / 5000, 2);
    });
  });

  describe('Analysis Components', () => {
    it('should generate comprehensive analysis', () => {
      const inputs: NetOperatingIncomeInputs = {
        propertyInfo: {
          propertyType: 'residential',
          totalUnits: 8,
          totalSquareFeet: 8000,
          propertyAge: 7,
          location: 'urban'
        },
        income: {
          baseRent: 1000,
          additionalIncome: 100,
          vacancyRate: 0.06,
          collectionLossRate: 0.02
        },
        expenses: {
          propertyManagement: 80,
          maintenance: 120,
          utilities: 64,
          insurance: 96,
          propertyTaxes: 160,
          marketing: 40,
          legal: 24,
          accounting: 32,
          otherOperatingExpenses: 80
        },
        marketData: {
          marketRent: 1050,
          marketVacancyRate: 0.05,
          marketExpenseRatio: 0.35
        }
      };

      const result = calculator.calculate(inputs);

      expect(result.analysis).toBeDefined();
      expect(result.analysis.overallAssessment).toBeDefined();
      expect(result.analysis.strengths).toBeDefined();
      expect(result.analysis.weaknesses).toBeDefined();
      expect(result.analysis.recommendations).toBeDefined();
      expect(result.analysis.riskFactors).toBeDefined();
      expect(result.analysis.opportunities).toBeDefined();
    });

    it('should include expense breakdown', () => {
      const inputs: NetOperatingIncomeInputs = {
        propertyInfo: {
          propertyType: 'residential',
          totalUnits: 6,
          totalSquareFeet: 6000,
          propertyAge: 5,
          location: 'urban'
        },
        income: {
          baseRent: 1100,
          additionalIncome: 110,
          vacancyRate: 0.04,
          collectionLossRate: 0.01
        },
        expenses: {
          propertyManagement: 66,
          maintenance: 99,
          utilities: 52,
          insurance: 78,
          propertyTaxes: 130,
          marketing: 32,
          legal: 19,
          accounting: 26,
          otherOperatingExpenses: 65
        },
        marketData: {
          marketRent: 1150,
          marketVacancyRate: 0.05,
          marketExpenseRatio: 0.38
        }
      };

      const result = calculator.calculate(inputs);

      expect(result.expenseBreakdown).toBeDefined();
      expect(result.expenseBreakdown.propertyManagement).toBe(66);
      expect(result.expenseBreakdown.maintenance).toBe(99);
      expect(result.expenseBreakdown.utilities).toBe(52);
      expect(result.expenseBreakdown.insurance).toBe(78);
      expect(result.expenseBreakdown.propertyTaxes).toBe(130);
    });

    it('should include income breakdown', () => {
      const inputs: NetOperatingIncomeInputs = {
        propertyInfo: {
          propertyType: 'residential',
          totalUnits: 4,
          totalSquareFeet: 4000,
          propertyAge: 3,
          location: 'urban'
        },
        income: {
          baseRent: 1200,
          additionalIncome: 120,
          vacancyRate: 0.03,
          collectionLossRate: 0.01
        },
        expenses: {
          propertyManagement: 48,
          maintenance: 72,
          utilities: 38,
          insurance: 57,
          propertyTaxes: 95,
          marketing: 24,
          legal: 14,
          accounting: 19,
          otherOperatingExpenses: 48
        },
        marketData: {
          marketRent: 1250,
          marketVacancyRate: 0.04,
          marketExpenseRatio: 0.36
        }
      };

      const result = calculator.calculate(inputs);

      expect(result.incomeBreakdown).toBeDefined();
      expect(result.incomeBreakdown.baseRent).toBe(1200 * 4);
      expect(result.incomeBreakdown.additionalIncome).toBe(120 * 4);
      expect(result.incomeBreakdown.totalGrossIncome).toBe((1200 + 120) * 4);
    });
  });

  describe('Market Analysis', () => {
    it('should compare against market benchmarks', () => {
      const inputs: NetOperatingIncomeInputs = {
        propertyInfo: {
          propertyType: 'residential',
          totalUnits: 12,
          totalSquareFeet: 12000,
          propertyAge: 8,
          location: 'urban'
        },
        income: {
          baseRent: 900,
          additionalIncome: 90,
          vacancyRate: 0.07,
          collectionLossRate: 0.03
        },
        expenses: {
          propertyManagement: 108,
          maintenance: 162,
          utilities: 86,
          insurance: 129,
          propertyTaxes: 216,
          marketing: 54,
          legal: 32,
          accounting: 43,
          otherOperatingExpenses: 108
        },
        marketData: {
          marketRent: 950,
          marketVacancyRate: 0.05,
          marketExpenseRatio: 0.40
        }
      };

      const result = calculator.calculate(inputs);

      expect(result.marketAnalysis).toBeDefined();
      expect(result.marketAnalysis.rentComparison).toBeDefined();
      expect(result.marketAnalysis.vacancyComparison).toBeDefined();
      expect(result.marketAnalysis.expenseComparison).toBeDefined();
      expect(result.marketAnalysis.competitivePosition).toBeDefined();
    });
  });

  describe('Performance Metrics', () => {
    it('should calculate performance metrics', () => {
      const inputs: NetOperatingIncomeInputs = {
        propertyInfo: {
          propertyType: 'commercial',
          totalUnits: 2,
          totalSquareFeet: 8000,
          propertyAge: 12,
          location: 'suburban'
        },
        income: {
          baseRent: 4000,
          additionalIncome: 400,
          vacancyRate: 0.10,
          collectionLossRate: 0.02
        },
        expenses: {
          propertyManagement: 240,
          maintenance: 320,
          utilities: 160,
          insurance: 200,
          propertyTaxes: 480,
          marketing: 80,
          legal: 40,
          accounting: 60,
          otherOperatingExpenses: 160
        },
        marketData: {
          marketRent: 4200,
          marketVacancyRate: 0.08,
          marketExpenseRatio: 0.32
        }
      };

      const result = calculator.calculate(inputs);

      expect(result.performanceMetrics).toBeDefined();
      expect(result.performanceMetrics.efficiencyScore).toBeDefined();
      expect(result.performanceMetrics.occupancyScore).toBeDefined();
      expect(result.performanceMetrics.expenseControlScore).toBeDefined();
      expect(result.performanceMetrics.overallScore).toBeDefined();
    });
  });
});