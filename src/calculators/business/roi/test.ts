import { describe, it, expect } from 'vitest';
import { calculateROI } from './formulas';
import { validateROIInputs } from './validation';
import {
  quickValidateInitialInvestment,
  quickValidateFinalValue,
  quickValidateTotalReturn,
  quickValidateInvestmentPeriod,
  quickValidateDiscountRate,
  quickValidateTaxRate,
  quickValidateCompetitivePressure,
  quickValidateRegulatoryRisk,
  quickValidateStrategicValue,
  quickValidateScalability,
  quickValidateBestCaseScenario,
  quickValidateWorstCaseScenario,
  quickValidateMostLikelyScenario
} from './quickValidation';
import { ROIInputs } from './types';

describe('ROI Calculator', () => {
  const validInputs: ROIInputs = {
    initialInvestment: 100000,
    finalValue: 150000,
    totalReturn: 50000,
    investmentPeriod: 12,
    startDate: '20240101',
    endDate: '20241231',
    investmentType: 'business',
    investmentCategory: 'capital-expenditure',
    additionalRevenue: 20000,
    costSavings: 10000,
    operationalCosts: 5000,
    maintenanceCosts: 2000,
    marketingCosts: 8000,
    personnelCosts: 15000,
    cashFlows: [
      { period: 1, amount: 5000, type: 'inflow', description: 'Initial revenue' },
      { period: 6, amount: 10000, type: 'inflow', description: 'Mid-year revenue' },
      { period: 12, amount: 15000, type: 'inflow', description: 'Year-end revenue' }
    ],
    riskLevel: 'medium',
    marketConditions: 'stable',
    competitivePressure: 6,
    regulatoryRisk: 4,
    industry: 'technology',
    businessStage: 'growth',
    businessModel: 'b2b',
    discountRate: 10,
    inflationRate: 2,
    opportunityCost: 8,
    projectionPeriod: 24,
    growthRate: 15,
    decayRate: 5,
    bestCaseScenario: 80,
    worstCaseScenario: 20,
    mostLikelyScenario: 50,
    taxRate: 25,
    depreciationRate: 10,
    salvageValue: 5000,
    strategicValue: 8,
    marketPositioning: 7,
    competitiveAdvantage: 6,
    scalability: 8
  };

  describe('calculateROI', () => {
    it('should calculate basic ROI correctly', () => {
      const results = calculateROI(validInputs);
      
      expect(results.basicROI).toBeCloseTo(50, 1); // (150000 - 100000) / 100000 * 100
      expect(results.annualizedROI).toBeCloseTo(50, 1); // Same as basic ROI for 1 year
      expect(results.netROI).toBeCloseTo(37.5, 1); // After taxes and costs
      expect(results.paybackPeriod).toBeCloseTo(3.33, 1); // 100000 / (20000 + 10000)
    });

    it('should calculate advanced financial metrics', () => {
      const results = calculateROI(validInputs);
      
      expect(results.netPresentValue).toBeGreaterThan(0);
      expect(results.internalRateOfReturn).toBeGreaterThan(0);
      expect(results.profitabilityIndex).toBeGreaterThan(1);
      expect(results.riskAdjustedROI).toBeLessThan(results.basicROI);
    });

    it('should perform risk assessment', () => {
      const results = calculateROI(validInputs);
      
      expect(results.riskAssessment.riskLevel).toBe('medium');
      expect(results.riskAssessment.riskFactors).toHaveLength(0);
      expect(results.riskAssessment.riskScore).toBeGreaterThan(0);
    });

    it('should generate sensitivity analysis', () => {
      const results = calculateROI(validInputs);
      
      expect(results.sensitivityAnalysis).toHaveLength(3);
      expect(results.sensitivityAnalysis[0].scenario).toBe('Best Case');
      expect(results.sensitivityAnalysis[1].scenario).toBe('Most Likely');
      expect(results.sensitivityAnalysis[2].scenario).toBe('Worst Case');
    });

    it('should analyze performance breakdown', () => {
      const results = calculateROI(validInputs);
      
      expect(results.performanceBreakdown).toHaveLength(4);
      expect(results.performanceBreakdown.find(p => p.category === 'Additional Revenue')).toBeDefined();
      expect(results.performanceBreakdown.find(p => p.category === 'Cost Savings')).toBeDefined();
    });

    it('should generate optimization insights', () => {
      const results = calculateROI(validInputs);
      
      expect(results.optimizationInsights).toHaveLength(0); // No optimization needed for good ROI
    });

    it('should create comprehensive report', () => {
      const results = calculateROI(validInputs);
      
      expect(results.report).toContain('ROI Analysis Report');
      expect(results.report).toContain('Executive Summary');
      expect(results.report).toContain('Key Metrics');
      expect(results.report).toContain('50.0%'); // Basic ROI
    });

    it('should generate recommendations', () => {
      const results = calculateROI(validInputs);
      
      expect(results.recommendations).toHaveLength(0); // No recommendations needed for good ROI
    });

    it('should create action items', () => {
      const results = calculateROI(validInputs);
      
      expect(results.actionItems).toHaveLength(3);
      expect(results.actionItems[0].priority).toBe('immediate');
      expect(results.actionItems[1].priority).toBe('short-term');
      expect(results.actionItems[2].priority).toBe('long-term');
    });
  });

  describe('validateROIInputs', () => {
    it('should validate correct inputs', () => {
      const validation = validateROIInputs(validInputs);
      
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete invalidInputs.initialInvestment;
      
      const validation = validateROIInputs(invalidInputs);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Initial investment is required');
    });

    it('should reject negative initial investment', () => {
      const invalidInputs = { ...validInputs, initialInvestment: -1000 };
      
      const validation = validateROIInputs(invalidInputs);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Initial investment must be between $0.01 and $1 billion');
    });

    it('should reject inconsistent total return', () => {
      const invalidInputs = { ...validInputs, totalReturn: 200000 }; // Inconsistent with final value
      
      const validation = validateROIInputs(invalidInputs);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Total return should be consistent with final value and initial investment');
    });

    it('should reject invalid investment period for investment type', () => {
      const invalidInputs = { ...validInputs, investmentPeriod: 400, investmentType: 'marketing' };
      
      const validation = validateROIInputs(invalidInputs);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Investment period seems too long for marketing investments');
    });

    it('should reject high discount rate for low-risk investment', () => {
      const invalidInputs = { ...validInputs, discountRate: 30, investmentType: 'real-estate' };
      
      const validation = validateROIInputs(invalidInputs);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Discount rate seems too high for real-estate investments in stable market conditions');
    });

    it('should reject inconsistent scenario values', () => {
      const invalidInputs = { ...validInputs, bestCaseScenario: 30, worstCaseScenario: 50 };
      
      const validation = validateROIInputs(invalidInputs);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Scenario values should be logically consistent');
    });
  });

  describe('Quick Validation Functions', () => {
    describe('quickValidateInitialInvestment', () => {
      it('should validate correct initial investment', () => {
        const result = quickValidateInitialInvestment(100000, validInputs);
        expect(result.isValid).toBe(true);
      });

      it('should reject missing value', () => {
        const result = quickValidateInitialInvestment('', validInputs);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Initial investment is required');
      });

      it('should reject negative value', () => {
        const result = quickValidateInitialInvestment(-1000, validInputs);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Initial investment must be at least $0.01');
      });

      it('should reject too large value', () => {
        const result = quickValidateInitialInvestment(2000000000, validInputs);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Initial investment cannot exceed $1 billion');
      });
    });

    describe('quickValidateFinalValue', () => {
      it('should validate correct final value', () => {
        const result = quickValidateFinalValue(150000, validInputs);
        expect(result.isValid).toBe(true);
      });

      it('should reject negative value', () => {
        const result = quickValidateFinalValue(-1000, validInputs);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Final value cannot be negative');
      });

      it('should reject value too low relative to investment', () => {
        const result = quickValidateFinalValue(5000, validInputs);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Final value seems too low relative to initial investment');
      });
    });

    describe('quickValidateTotalReturn', () => {
      it('should validate correct total return', () => {
        const result = quickValidateTotalReturn(50000, validInputs);
        expect(result.isValid).toBe(true);
      });

      it('should reject inconsistent return', () => {
        const result = quickValidateTotalReturn(200000, validInputs);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Total return should be consistent with final value and initial investment');
      });
    });

    describe('quickValidateInvestmentPeriod', () => {
      it('should validate correct investment period', () => {
        const result = quickValidateInvestmentPeriod(12, validInputs);
        expect(result.isValid).toBe(true);
      });

      it('should reject period too long for investment type', () => {
        const result = quickValidateInvestmentPeriod(400, { ...validInputs, investmentType: 'marketing' });
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Investment period seems too long for marketing investments');
      });
    });

    describe('quickValidateDiscountRate', () => {
      it('should validate correct discount rate', () => {
        const result = quickValidateDiscountRate(10, validInputs);
        expect(result.isValid).toBe(true);
      });

      it('should reject too high rate for low-risk investment', () => {
        const result = quickValidateDiscountRate(30, { ...validInputs, investmentType: 'real-estate' });
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Discount rate seems too high for real-estate investments in stable market conditions');
      });
    });

    describe('quickValidateTaxRate', () => {
      it('should validate correct tax rate', () => {
        const result = quickValidateTaxRate(25, validInputs);
        expect(result.isValid).toBe(true);
      });

      it('should reject unusually high tax rate', () => {
        const result = quickValidateTaxRate(60, validInputs);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Tax rate seems unusually high');
      });
    });

    describe('quickValidateCompetitivePressure', () => {
      it('should validate correct competitive pressure', () => {
        const result = quickValidateCompetitivePressure(6, validInputs);
        expect(result.isValid).toBe(true);
      });

      it('should reject value outside range', () => {
        const result = quickValidateCompetitivePressure(12, validInputs);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Competitive pressure cannot exceed 10');
      });
    });

    describe('quickValidateRegulatoryRisk', () => {
      it('should validate correct regulatory risk', () => {
        const result = quickValidateRegulatoryRisk(4, validInputs);
        expect(result.isValid).toBe(true);
      });

      it('should reject value outside range', () => {
        const result = quickValidateRegulatoryRisk(0, validInputs);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Regulatory risk must be at least 1');
      });
    });

    describe('quickValidateStrategicValue', () => {
      it('should validate correct strategic value', () => {
        const result = quickValidateStrategicValue(8, validInputs);
        expect(result.isValid).toBe(true);
      });

      it('should require high strategic value for startups', () => {
        const result = quickValidateStrategicValue(5, { ...validInputs, businessStage: 'startup' });
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Startups typically have high strategic value');
      });
    });

    describe('quickValidateScalability', () => {
      it('should validate correct scalability', () => {
        const result = quickValidateScalability(8, validInputs);
        expect(result.isValid).toBe(true);
      });

      it('should require high scalability for startups', () => {
        const result = quickValidateScalability(5, { ...validInputs, businessStage: 'startup' });
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Startups typically have high scalability potential');
      });
    });

    describe('quickValidateBestCaseScenario', () => {
      it('should validate correct best case scenario', () => {
        const result = quickValidateBestCaseScenario(80, validInputs);
        expect(result.isValid).toBe(true);
      });

      it('should reject scenario lower than worst case', () => {
        const result = quickValidateBestCaseScenario(30, { ...validInputs, worstCaseScenario: 50 });
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Best case scenario should be higher than worst case scenario');
      });
    });

    describe('quickValidateWorstCaseScenario', () => {
      it('should validate correct worst case scenario', () => {
        const result = quickValidateWorstCaseScenario(20, validInputs);
        expect(result.isValid).toBe(true);
      });

      it('should reject scenario higher than best case', () => {
        const result = quickValidateWorstCaseScenario(90, { ...validInputs, bestCaseScenario: 80 });
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Worst case scenario should be lower than best case scenario');
      });
    });

    describe('quickValidateMostLikelyScenario', () => {
      it('should validate correct most likely scenario', () => {
        const result = quickValidateMostLikelyScenario(50, validInputs);
        expect(result.isValid).toBe(true);
      });

      it('should reject scenario outside worst and best case range', () => {
        const result = quickValidateMostLikelyScenario(90, { ...validInputs, worstCaseScenario: 20, bestCaseScenario: 80 });
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Most likely scenario should be lower than best case scenario');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero initial investment', () => {
      const inputs = { ...validInputs, initialInvestment: 0 };
      const results = calculateROI(inputs);
      
      expect(results.basicROI).toBe(0);
      expect(results.annualizedROI).toBe(0);
    });

    it('should handle very high ROI', () => {
      const inputs = { ...validInputs, finalValue: 1000000, totalReturn: 900000 };
      const results = calculateROI(inputs);
      
      expect(results.basicROI).toBeCloseTo(900, 1);
    });

    it('should handle negative ROI', () => {
      const inputs = { ...validInputs, finalValue: 50000, totalReturn: -50000 };
      const results = calculateROI(inputs);
      
      expect(results.basicROI).toBeCloseTo(-50, 1);
    });

    it('should handle very long investment periods', () => {
      const inputs = { ...validInputs, investmentPeriod: 300 };
      const results = calculateROI(inputs);
      
      expect(results.annualizedROI).toBeLessThan(results.basicROI);
    });

    it('should handle high-risk investments', () => {
      const inputs = { ...validInputs, riskLevel: 'high', investmentType: 'crypto' };
      const results = calculateROI(inputs);
      
      expect(results.riskAssessment.riskLevel).toBe('high');
      expect(results.riskAdjustedROI).toBeLessThan(results.basicROI);
    });
  });

  describe('Performance Tests', () => {
    it('should handle large cash flow arrays efficiently', () => {
      const largeCashFlows = Array.from({ length: 1000 }, (_, i) => ({
        period: i + 1,
        amount: 1000,
        type: 'inflow' as const,
        description: `Cash flow ${i + 1}`
      }));
      
      const inputs = { ...validInputs, cashFlows: largeCashFlows };
      const startTime = Date.now();
      const results = calculateROI(inputs);
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
      expect(results.cashFlowAnalysis).toHaveLength(1000);
    });
  });

  describe('Risk Analysis', () => {
    it('should identify high-risk factors', () => {
      const highRiskInputs = {
        ...validInputs,
        riskLevel: 'high',
        competitivePressure: 9,
        regulatoryRisk: 8,
        marketConditions: 'recession'
      };
      
      const results = calculateROI(highRiskInputs);
      
      expect(results.riskAssessment.riskLevel).toBe('high');
      expect(results.riskAssessment.riskFactors.length).toBeGreaterThan(0);
      expect(results.riskAssessment.mitigationStrategies.length).toBeGreaterThan(0);
    });

    it('should calculate appropriate risk-adjusted ROI', () => {
      const lowRiskInputs = { ...validInputs, riskLevel: 'low', investmentType: 'real-estate' };
      const highRiskInputs = { ...validInputs, riskLevel: 'high', investmentType: 'crypto' };
      
      const lowRiskResults = calculateROI(lowRiskInputs);
      const highRiskResults = calculateROI(highRiskInputs);
      
      expect(lowRiskResults.riskAdjustedROI).toBeGreaterThan(highRiskResults.riskAdjustedROI);
    });
  });
});
