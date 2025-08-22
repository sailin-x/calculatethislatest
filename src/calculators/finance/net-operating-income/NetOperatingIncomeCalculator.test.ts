import { describe, it, expect } from 'vitest';
import { calculateNetOperatingIncome, generateNetOperatingIncomeAnalysis } from './formulas';
import { validateNetOperatingIncomeInputs } from './validation';
import { quickValidateNetOperatingIncome } from './quickValidation';
import { NetOperatingIncomeInputs } from './validation';

describe('Net Operating Income Calculator', () => {
  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        propertyTax: 8000,
        insurance: 3000
      };

      const result = validateNetOperatingIncomeInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const inputs = {
        grossRentalIncome: 120000
        // Missing propertyTax and insurance
      };

      const result = validateNetOperatingIncomeInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject negative gross rental income', () => {
      const inputs: Partial<NetOperatingIncomeInputs> = {
        grossRentalIncome: -1000,
        propertyTax: 8000,
        insurance: 3000
      };

      const result = validateNetOperatingIncomeInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Gross rental income is required and must be greater than 0');
    });

    it('should reject negative property tax', () => {
      const inputs: Partial<NetOperatingIncomeInputs> = {
        grossRentalIncome: 120000,
        propertyTax: -1000,
        insurance: 3000
      };

      const result = validateNetOperatingIncomeInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property tax is required and must be 0 or greater');
    });

    it('should reject vacancy loss exceeding gross income', () => {
      const inputs: Partial<NetOperatingIncomeInputs> = {
        grossRentalIncome: 120000,
        propertyTax: 8000,
        insurance: 3000,
        vacancyLoss: 150000 // Exceeds gross income
      };

      const result = validateNetOperatingIncomeInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Vacancy loss cannot exceed gross rental income');
    });
  });

  describe('Quick Validation', () => {
    it('should pass quick validation with valid inputs', () => {
      const inputs: Partial<NetOperatingIncomeInputs> = {
        grossRentalIncome: 120000,
        propertyTax: 8000,
        insurance: 3000
      };

      expect(quickValidateNetOperatingIncome(inputs)).toBe(true);
    });

    it('should fail quick validation with missing fields', () => {
      const inputs: Partial<NetOperatingIncomeInputs> = {
        grossRentalIncome: 120000
        // Missing required fields
      };

      expect(quickValidateNetOperatingIncome(inputs)).toBe(false);
    });

    it('should fail quick validation with negative values', () => {
      const inputs: Partial<NetOperatingIncomeInputs> = {
        grossRentalIncome: -120000,
        propertyTax: 8000,
        insurance: 3000
      };

      expect(quickValidateNetOperatingIncome(inputs)).toBe(false);
    });
  });

  describe('Calculations', () => {
    it('should calculate basic NOI correctly', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        propertyTax: 8000,
        insurance: 3000
      };

      const result = calculateNetOperatingIncome(inputs);
      
      expect(result.netOperatingIncome).toBe(109000); // 120000 - 8000 - 3000
      expect(result.grossOperatingIncome).toBe(120000);
      expect(result.totalOperatingExpenses).toBe(11000);
      expect(result.operatingExpenseRatio).toBeCloseTo(9.17, 1); // (11000/120000)*100
    });

    it('should calculate NOI with all expenses', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        otherIncome: 5000,
        vacancyLoss: 6000,
        concessions: 2000,
        propertyTax: 8000,
        insurance: 3000,
        utilities: 4000,
        maintenance: 6000,
        propertyManagement: 9000,
        landscaping: 2000,
        janitorial: 3000,
        security: 1500,
        advertising: 1000,
        legal: 2000,
        accounting: 1500,
        licenses: 500,
        supplies: 800,
        trash: 1200,
        snowRemoval: 1000,
        pool: 1800,
        elevator: 2400,
        parking: 1500,
        roofing: 3000,
        hvac: 2500,
        pestControl: 800,
        reserves: 5000,
        hoaFees: 2400
      };

      const result = calculateNetOperatingIncome(inputs);
      
      expect(result.grossOperatingIncome).toBe(117000); // 125000 - 6000 - 2000
      expect(result.totalOperatingExpenses).toBe(61900);
      expect(result.netOperatingIncome).toBe(55100); // 117000 - 61900
      expect(result.operatingExpenseRatio).toBeCloseTo(49.52, 1); // (61900/125000)*100
    });

    it('should calculate cap rate correctly', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        propertyTax: 8000,
        insurance: 3000,
        propertyValue: 800000
      };

      const result = calculateNetOperatingIncome(inputs);
      
      expect(result.capRate).toBeCloseTo(13.625, 2); // (109000/800000)*100
    });

    it('should calculate monthly NOI correctly', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        propertyTax: 8000,
        insurance: 3000
      };

      const result = calculateNetOperatingIncome(inputs);
      
      expect(result.monthlyNOI).toBeCloseTo(9083.33, 0); // 109000/12
    });

    it('should calculate NOI per unit correctly', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        propertyTax: 8000,
        insurance: 3000,
        numberOfUnits: 10
      };

      const result = calculateNetOperatingIncome(inputs);
      
      expect(result.noiPerUnit).toBe(10900); // 109000/10
    });
  });

  describe('Income Breakdown', () => {
    it('should calculate income breakdown correctly', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        otherIncome: 5000,
        vacancyLoss: 6000,
        concessions: 2000,
        propertyTax: 8000,
        insurance: 3000
      };

      const result = calculateNetOperatingIncome(inputs);
      
      expect(result.incomeBreakdown.grossRentalIncome).toBe(120000);
      expect(result.incomeBreakdown.otherIncome).toBe(5000);
      expect(result.incomeBreakdown.totalGrossIncome).toBe(125000);
      expect(result.incomeBreakdown.vacancyLoss).toBe(6000);
      expect(result.incomeBreakdown.concessions).toBe(2000);
      expect(result.incomeBreakdown.totalDeductions).toBe(8000);
      expect(result.grossOperatingIncome).toBe(117000);
    });
  });

  describe('Expense Breakdown', () => {
    it('should calculate expense breakdown correctly', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        propertyTax: 8000,
        insurance: 3000,
        utilities: 4000,
        maintenance: 6000,
        propertyManagement: 9000
      };

      const result = calculateNetOperatingIncome(inputs);
      
      expect(result.expenseBreakdown.propertyTax).toBe(8000);
      expect(result.expenseBreakdown.insurance).toBe(3000);
      expect(result.expenseBreakdown.utilities).toBe(4000);
      expect(result.expenseBreakdown.maintenance).toBe(6000);
      expect(result.expenseBreakdown.propertyManagement).toBe(9000);
      expect(result.totalOperatingExpenses).toBe(30000);
    });
  });

  describe('Profitability Analysis', () => {
    it('should calculate profitability metrics correctly', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        otherIncome: 5000,
        vacancyLoss: 6000,
        concessions: 2000,
        propertyTax: 8000,
        insurance: 3000,
        utilities: 4000,
        maintenance: 6000
      };

      const result = calculateNetOperatingIncome(inputs);
      
      expect(result.profitabilityAnalysis.noiMargin).toBeCloseTo(73.6, 1); // (90000/125000)*100
      expect(result.profitabilityAnalysis.expenseEfficiency).toBeCloseTo(5.85, 2); // 117000/21000
      expect(result.profitabilityAnalysis.incomeStability).toBeCloseTo(93.6, 1); // (117000/125000)*100
      expect(result.profitabilityAnalysis.cashFlowStrength).toBeCloseTo(4.29, 2); // 90000/21000
    });
  });

  describe('Expense Efficiency', () => {
    it('should calculate expense efficiency metrics correctly', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        propertyTax: 8000,
        insurance: 3000,
        utilities: 4000,
        maintenance: 6000,
        numberOfUnits: 10,
        propertySize: 10000
      };

      const result = calculateNetOperatingIncome(inputs);
      
      expect(result.expenseEfficiency.expensePerUnit).toBe(2100); // 21000/10
      expect(result.expenseEfficiency.expensePerSqFt).toBe(2.1); // 21000/10000
      expect(result.expenseEfficiency.expenseRatio).toBeCloseTo(17.5, 1); // (21000/120000)*100
      expect(result.expenseEfficiency.efficiencyRating).toBe('Good');
    });

    it('should rate efficiency correctly', () => {
      const testCases = [
        { ratio: 25, expected: 'Excellent' },
        { ratio: 35, expected: 'Good' },
        { ratio: 45, expected: 'Average' },
        { ratio: 55, expected: 'Below Average' },
        { ratio: 65, expected: 'Poor' }
      ];

      testCases.forEach(({ ratio, expected }) => {
        const inputs: NetOperatingIncomeInputs = {
          grossRentalIncome: 100000,
          propertyTax: ratio * 1000, // This will create the desired ratio
          insurance: 0
        };

        const result = calculateNetOperatingIncome(inputs);
        expect(result.expenseEfficiency.efficiencyRating).toBe(expected);
      });
    });
  });

  describe('Risk Assessment', () => {
    it('should identify income risks correctly', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        vacancyLoss: 15000, // > 10% of gross income
        propertyTax: 8000,
        insurance: 3000
      };

      const result = calculateNetOperatingIncome(inputs);
      
      expect(result.riskAssessment.incomeRisks.length).toBeGreaterThan(0);
      expect(result.riskAssessment.incomeRisks.some(risk => risk.includes('vacancy'))).toBe(true);
    });

    it('should identify expense risks correctly', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        propertyTax: 8000,
        insurance: 3000,
        utilities: 4000,
        maintenance: 6000,
        propertyManagement: 9000,
        landscaping: 2000,
        janitorial: 3000,
        security: 1500,
        advertising: 1000,
        legal: 2000,
        accounting: 1500,
        licenses: 500,
        supplies: 800,
        trash: 1200,
        snowRemoval: 1000,
        pool: 1800,
        elevator: 2400,
        parking: 1500,
        roofing: 3000,
        hvac: 2500,
        pestControl: 800,
        reserves: 5000,
        hoaFees: 2400
      };

      const result = calculateNetOperatingIncome(inputs);
      
      expect(result.riskAssessment.expenseRisks.length).toBeGreaterThan(0);
      expect(result.riskAssessment.expenseRisks.some(risk => risk.includes('expenses'))).toBe(true);
    });

    it('should identify market risks correctly', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        propertyTax: 8000,
        insurance: 3000,
        propertyValue: 5000000 // Very high value for the NOI
      };

      const result = calculateNetOperatingIncome(inputs);
      
      expect(result.riskAssessment.marketRisks.length).toBeGreaterThan(0);
      expect(result.riskAssessment.marketRisks.some(risk => risk.includes('cap rate'))).toBe(true);
    });

    it('should assess overall risk level correctly', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        vacancyLoss: 15000, // High vacancy
        propertyTax: 8000,
        insurance: 3000,
        utilities: 4000,
        maintenance: 6000,
        propertyManagement: 9000,
        landscaping: 2000,
        janitorial: 3000,
        security: 1500,
        advertising: 1000,
        legal: 2000,
        accounting: 1500,
        licenses: 500,
        supplies: 800,
        trash: 1200,
        snowRemoval: 1000,
        pool: 1800,
        elevator: 2400,
        parking: 1500,
        roofing: 3000,
        hvac: 2500,
        pestControl: 800,
        reserves: 5000,
        hoaFees: 2400,
        propertyValue: 5000000 // Low cap rate
      };

      const result = calculateNetOperatingIncome(inputs);
      
      expect(result.riskAssessment.overallRiskLevel).toBe('High');
    });
  });

  describe('Comparison Metrics', () => {
    it('should calculate comparison metrics correctly', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        propertyTax: 8000,
        insurance: 3000,
        propertyValue: 800000,
        numberOfUnits: 10,
        propertySize: 10000
      };

      const result = calculateNetOperatingIncome(inputs);
      
      expect(result.comparisonMetrics.noiPerSqFt).toBe(10.9); // 109000/10000
      expect(result.comparisonMetrics.expensePerSqFt).toBe(1.1); // 11000/10000
      expect(result.comparisonMetrics.incomePerUnit).toBe(12000); // 120000/10
      expect(result.comparisonMetrics.marketComparison).toBe('Above Market');
    });

    it('should categorize market comparison correctly', () => {
      const testCases = [
        { capRate: 10, expected: 'Above Market' },
        { capRate: 7, expected: 'Market Rate' },
        { capRate: 5, expected: 'Below Market' },
        { capRate: 2, expected: 'Significantly Below Market' }
      ];

      testCases.forEach(({ capRate, expected }) => {
        const inputs: NetOperatingIncomeInputs = {
          grossRentalIncome: 100000,
          propertyTax: 5000,
          insurance: 2000,
          propertyValue: 930000 / (capRate / 100) // Calculate value to get desired cap rate
        };

        const result = calculateNetOperatingIncome(inputs);
        expect(result.comparisonMetrics.marketComparison).toBe(expected);
      });
    });
  });

  describe('Recommendations', () => {
    it('should provide recommendations for high expense ratio', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        propertyTax: 8000,
        insurance: 3000,
        utilities: 4000,
        maintenance: 6000,
        propertyManagement: 9000,
        landscaping: 2000,
        janitorial: 3000,
        security: 1500,
        advertising: 1000,
        legal: 2000,
        accounting: 1500,
        licenses: 500,
        supplies: 800,
        trash: 1200,
        snowRemoval: 1000,
        pool: 1800,
        elevator: 2400,
        parking: 1500,
        roofing: 3000,
        hvac: 2500,
        pestControl: 800,
        reserves: 5000,
        hoaFees: 2400
      };

      const result = calculateNetOperatingIncome(inputs);
      
      expect(result.recommendations.length).toBeGreaterThan(0);
      expect(result.recommendations.some(rec => rec.includes('reducing operating expenses'))).toBe(true);
    });

    it('should provide recommendations for high vacancy loss', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        vacancyLoss: 12000, // 10% of gross income
        propertyTax: 8000,
        insurance: 3000
      };

      const result = calculateNetOperatingIncome(inputs);
      
      expect(result.recommendations.some(rec => rec.includes('vacancy loss'))).toBe(true);
    });

    it('should provide recommendations for low cap rate', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        propertyTax: 8000,
        insurance: 3000,
        propertyValue: 5000000 // Very high value
      };

      const result = calculateNetOperatingIncome(inputs);
      
      expect(result.recommendations.some(rec => rec.includes('cap rate'))).toBe(true);
    });

    it('should provide recommendations for positive NOI', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        propertyTax: 8000,
        insurance: 3000
      };

      const result = calculateNetOperatingIncome(inputs);
      
      expect(result.recommendations.some(rec => rec.includes('Positive NOI'))).toBe(true);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        propertyTax: 8000,
        insurance: 3000,
        propertyValue: 800000
      };

      const result = calculateNetOperatingIncome(inputs);
      const analysis = generateNetOperatingIncomeAnalysis(inputs, result);
      
      expect(analysis).toContain('Net Operating Income (NOI) Analysis');
      expect(analysis).toContain('Summary');
      expect(analysis).toContain('Key Metrics');
      expect(analysis).toContain('Income Breakdown');
      expect(analysis).toContain('Operating Expenses');
      expect(analysis).toContain('Profitability Analysis');
      expect(analysis).toContain('Expense Efficiency');
      expect(analysis).toContain('Risk Assessment');
      expect(analysis).toContain('Comparison Metrics');
      expect(analysis).toContain('Recommendations');
      expect(analysis).toContain('Property Details');
    });

    it('should include correct values in report', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        propertyTax: 8000,
        insurance: 3000,
        propertyValue: 800000
      };

      const result = calculateNetOperatingIncome(inputs);
      const analysis = generateNetOperatingIncomeAnalysis(inputs, result);
      
      expect(analysis).toContain('$109,000'); // NOI
      expect(analysis).toContain('$120,000'); // Gross Operating Income
      expect(analysis).toContain('$11,000'); // Total Operating Expenses
      expect(analysis).toContain('9.2%'); // Operating Expense Ratio
      expect(analysis).toContain('13.63%'); // Cap Rate
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero expenses', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        propertyTax: 0,
        insurance: 0
      };

      const result = calculateNetOperatingIncome(inputs);
      
      expect(result.netOperatingIncome).toBe(120000);
      expect(result.operatingExpenseRatio).toBe(0);
      expect(result.capRate).toBe(0); // No property value provided
    });

    it('should handle zero income', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 0,
        propertyTax: 8000,
        insurance: 3000
      };

      const result = calculateNetOperatingIncome(inputs);
      
      expect(result.netOperatingIncome).toBe(-11000);
      expect(result.operatingExpenseRatio).toBe(0);
    });

    it('should handle very high property value', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        propertyTax: 8000,
        insurance: 3000,
        propertyValue: 10000000
      };

      const result = calculateNetOperatingIncome(inputs);
      
      expect(result.capRate).toBeCloseTo(1.09, 2); // Very low cap rate
      expect(result.comparisonMetrics.marketComparison).toBe('Significantly Below Market');
    });

    it('should handle very low property value', () => {
      const inputs: NetOperatingIncomeInputs = {
        grossRentalIncome: 120000,
        propertyTax: 8000,
        insurance: 3000,
        propertyValue: 100000
      };

      const result = calculateNetOperatingIncome(inputs);
      
      expect(result.capRate).toBeCloseTo(109, 0); // Very high cap rate
      expect(result.comparisonMetrics.marketComparison).toBe('Above Market');
    });
  });
});