import { describe, it, expect } from 'vitest';
import { calculateMezzanineFinancing } from './formulas';
import { generateMezzanineFinancingAnalysis } from './formulas';
import { validateAllMezzanineFinancingInputs } from './quickValidation';

describe('Mezzanine Financing Calculator', () => {
  const baseInputs = {
    projectValue: 5000000,
    seniorLoanAmount: 3000000,
    mezzanineLoanAmount: 1000000,
    equityContribution: 1000000,
    seniorLoanRate: 5.5,
    mezzanineLoanRate: 12.0,
    seniorLoanTerm: 30,
    mezzanineLoanTerm: 5,
    projectTimeline: 24,
    expectedExitValue: 6500000,
    exitTimeline: 36,
    mezzanineFees: 50000,
    mezzanineEquityKicker: 15,
    operatingExpenses: 200000,
    vacancyRate: 5,
    propertyTaxRate: 1.2,
    insuranceRate: 0.5,
    managementFee: 4,
    mezzanineLTV: 75,
    seniorLTV: 60,
    mezzanineDSCR: 1.25,
    seniorDSCR: 1.35,
    mezzaninePrepaymentPenalty: 3,
    mezzanineOriginationFee: 2,
    mezzanineExitFee: 1
  };

  describe('Basic Mezzanine Financing Analysis', () => {
    it('should calculate mezzanine financing correctly', () => {
      const outputs = calculateMezzanineFinancing(baseInputs);

      expect(outputs.totalCapitalization).toBe(5000000);
      expect(outputs.seniorLTVRatio).toBe(60);
      expect(outputs.mezzanineLTVRatio).toBe(20);
      expect(outputs.totalLTVRatio).toBe(80);
      expect(outputs.equityPercentage).toBe(20);
      expect(outputs.weightedAverageCost).toBeGreaterThan(0);
      expect(outputs.debtServiceCoverage).toBeGreaterThan(0);
      expect(outputs.cashOnCashReturn).toBeDefined();
      expect(outputs.internalRateOfReturn).toBeDefined();
      expect(outputs.equityMultiple).toBeGreaterThan(1);
    });

    it('should calculate loan payments correctly', () => {
      const outputs = calculateMezzanineFinancing(baseInputs);

      expect(outputs.seniorLoanPayment).toBeGreaterThan(0);
      expect(outputs.mezzanineLoanPayment).toBeGreaterThan(0);
      expect(outputs.totalDebtService).toBe(outputs.seniorLoanPayment + outputs.mezzanineLoanPayment);
    });

    it('should calculate net operating income correctly', () => {
      const outputs = calculateMezzanineFinancing(baseInputs);

      expect(outputs.netOperatingIncome).toBeDefined();
      expect(outputs.netOperatingIncome).toBeGreaterThan(0);
    });
  });

  describe('LTV and Leverage Analysis', () => {
    it('should calculate LTV ratios correctly', () => {
      const inputs = { ...baseInputs, projectValue: 10000000, seniorLoanAmount: 6000000, mezzanineLoanAmount: 2000000 };
      const outputs = calculateMezzanineFinancing(inputs);

      expect(outputs.seniorLTVRatio).toBe(60);
      expect(outputs.mezzanineLTVRatio).toBe(20);
      expect(outputs.totalLTVRatio).toBe(80);
    });

    it('should handle high leverage scenarios', () => {
      const inputs = { ...baseInputs, seniorLoanAmount: 4000000, mezzanineLoanAmount: 800000, equityContribution: 200000 };
      const outputs = calculateMezzanineFinancing(inputs);

      expect(outputs.totalLTVRatio).toBe(96);
      expect(outputs.equityPercentage).toBe(4);
      expect(outputs.mezzanineRiskScore).toBeGreaterThan(70);
    });

    it('should handle conservative leverage scenarios', () => {
      const inputs = { ...baseInputs, seniorLoanAmount: 2000000, mezzanineLoanAmount: 500000, equityContribution: 2500000 };
      const outputs = calculateMezzanineFinancing(inputs);

      expect(outputs.totalLTVRatio).toBe(50);
      expect(outputs.equityPercentage).toBe(50);
      expect(outputs.mezzanineRiskScore).toBeLessThan(50);
    });
  });

  describe('Cost of Capital Analysis', () => {
    it('should calculate weighted average cost correctly', () => {
      const outputs = calculateMezzanineFinancing(baseInputs);

      expect(outputs.weightedAverageCost).toBeGreaterThan(baseInputs.seniorLoanRate);
      expect(outputs.weightedAverageCost).toBeLessThan(baseInputs.mezzanineLoanRate);
    });

    it('should calculate mezzanine cost of capital correctly', () => {
      const outputs = calculateMezzanineFinancing(baseInputs);

      expect(outputs.mezzanineCost).toBeGreaterThan(baseInputs.mezzanineLoanRate);
      expect(outputs.seniorCost).toBe(baseInputs.seniorLoanRate);
    });

    it('should handle different rate scenarios', () => {
      const inputs = { ...baseInputs, mezzanineLoanRate: 15, mezzanineFees: 100000 };
      const outputs = calculateMezzanineFinancing(inputs);

      expect(outputs.mezzanineCost).toBeGreaterThan(15);
      expect(outputs.weightedAverageCost).toBeGreaterThan(outputs.weightedAverageCost);
    });
  });

  describe('Return Analysis', () => {
    it('should calculate IRR and equity multiple correctly', () => {
      const outputs = calculateMezzanineFinancing(baseInputs);

      expect(outputs.internalRateOfReturn).toBeGreaterThan(0);
      expect(outputs.equityMultiple).toBeGreaterThan(1);
      expect(outputs.cashOnCashReturn).toBeDefined();
    });

    it('should handle different exit scenarios', () => {
      const inputs = { ...baseInputs, expectedExitValue: 8000000, exitTimeline: 48 };
      const outputs = calculateMezzanineFinancing(inputs);

      expect(outputs.internalRateOfReturn).toBeGreaterThan(0);
      expect(outputs.equityMultiple).toBeGreaterThan(1);
    });

    it('should calculate mezzanine equity value correctly', () => {
      const outputs = calculateMezzanineFinancing(baseInputs);

      const expectedEquityValue = baseInputs.expectedExitValue * (baseInputs.mezzanineEquityKicker / 100);
      expect(outputs.mezzanineEquityValue).toBe(expectedEquityValue);
    });
  });

  describe('Risk Assessment', () => {
    it('should calculate mezzanine risk score correctly', () => {
      const outputs = calculateMezzanineFinancing(baseInputs);

      expect(outputs.mezzanineRiskScore).toBeGreaterThanOrEqual(0);
      expect(outputs.mezzanineRiskScore).toBeLessThanOrEqual(100);
    });

    it('should assess high-risk scenarios', () => {
      const inputs = { ...baseInputs, mezzanineLoanRate: 18, totalLTVRatio: 90 };
      const outputs = calculateMezzanineFinancing(inputs);

      expect(outputs.mezzanineRiskScore).toBeGreaterThan(70);
    });

    it('should assess low-risk scenarios', () => {
      const inputs = { ...baseInputs, mezzanineLoanRate: 10, totalLTVRatio: 70 };
      const outputs = calculateMezzanineFinancing(inputs);

      expect(outputs.mezzanineRiskScore).toBeLessThan(50);
    });
  });

  describe('Capital Structure Analysis', () => {
    it('should calculate capital structure score correctly', () => {
      const outputs = calculateMezzanineFinancing(baseInputs);

      expect(outputs.capitalStructureScore).toBeGreaterThanOrEqual(0);
      expect(outputs.capitalStructureScore).toBeLessThanOrEqual(100);
    });

    it('should score optimal capital structure', () => {
      const inputs = { ...baseInputs, seniorLoanAmount: 3000000, mezzanineLoanAmount: 1000000, equityContribution: 1000000 };
      const outputs = calculateMezzanineFinancing(inputs);

      expect(outputs.capitalStructureScore).toBeGreaterThan(60);
    });
  });

  describe('Debt Service Coverage Analysis', () => {
    it('should calculate DSCR correctly', () => {
      const outputs = calculateMezzanineFinancing(baseInputs);

      expect(outputs.debtServiceCoverage).toBeGreaterThan(0);
    });

    it('should handle low DSCR scenarios', () => {
      const inputs = { ...baseInputs, operatingExpenses: 400000, vacancyRate: 15 };
      const outputs = calculateMezzanineFinancing(inputs);

      expect(outputs.debtServiceCoverage).toBeLessThan(1.5);
    });

    it('should handle high DSCR scenarios', () => {
      const inputs = { ...baseInputs, operatingExpenses: 100000, vacancyRate: 2 };
      const outputs = calculateMezzanineFinancing(inputs);

      expect(outputs.debtServiceCoverage).toBeGreaterThan(1.5);
    });
  });

  describe('Break-Even Analysis', () => {
    it('should calculate break-even occupancy correctly', () => {
      const outputs = calculateMezzanineFinancing(baseInputs);

      expect(outputs.breakEvenOccupancy).toBeGreaterThan(0);
      expect(outputs.breakEvenOccupancy).toBeLessThan(100);
    });

    it('should handle high debt service scenarios', () => {
      const inputs = { ...baseInputs, seniorLoanAmount: 4000000, mezzanineLoanAmount: 800000 };
      const outputs = calculateMezzanineFinancing(inputs);

      expect(outputs.breakEvenOccupancy).toBeGreaterThan(outputs.breakEvenOccupancy);
    });
  });

  describe('Recommendation Analysis', () => {
    it('should generate appropriate recommendations', () => {
      const outputs = calculateMezzanineFinancing(baseInputs);

      expect(outputs.mezzanineRecommendation).toBeDefined();
      expect(typeof outputs.mezzanineRecommendation).toBe('string');
    });

    it('should recommend against high-risk scenarios', () => {
      const inputs = { ...baseInputs, mezzanineLoanRate: 20, totalLTVRatio: 95 };
      const outputs = calculateMezzanineFinancing(inputs);

      expect(outputs.mezzanineRecommendation).toContain('Risk');
    });
  });

  describe('Analysis Reports', () => {
    it('should generate sensitivity analysis', () => {
      const outputs = calculateMezzanineFinancing(baseInputs);

      expect(outputs.sensitivityAnalysis).toBeDefined();
      expect(outputs.sensitivityAnalysis).toContain('Interest Rate');
      expect(outputs.sensitivityAnalysis).toContain('NOI');
    });

    it('should generate refinance analysis', () => {
      const outputs = calculateMezzanineFinancing(baseInputs);

      expect(outputs.refinanceAnalysis).toBeDefined();
      expect(outputs.refinanceAnalysis).toContain('refinance');
    });

    it('should generate exit strategy analysis', () => {
      const outputs = calculateMezzanineFinancing(baseInputs);

      expect(outputs.exitStrategyAnalysis).toBeDefined();
      expect(outputs.exitStrategyAnalysis).toContain('exit');
    });

    it('should generate risk mitigation strategies', () => {
      const outputs = calculateMezzanineFinancing(baseInputs);

      expect(outputs.riskMitigation).toBeDefined();
      expect(outputs.riskMitigation).toContain('monitor');
    });

    it('should generate mezzanine terms summary', () => {
      const outputs = calculateMezzanineFinancing(baseInputs);

      expect(outputs.mezzanineTerms).toBeDefined();
      expect(outputs.mezzanineTerms).toContain('Mezzanine Loan');
    });

    it('should generate comparative analysis', () => {
      const outputs = calculateMezzanineFinancing(baseInputs);

      expect(outputs.comparativeAnalysis).toBeDefined();
      expect(outputs.comparativeAnalysis).toContain('higher');
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const outputs = calculateMezzanineFinancing(baseInputs);
      const report = generateMezzanineFinancingAnalysis(baseInputs, outputs);

      expect(report).toContain('Mezzanine Financing Analysis Report');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Key Metrics');
      expect(report).toContain('Capital Structure');
      expect(report).toContain('Cost Analysis');
      expect(report).toContain('Performance Metrics');
      expect(report).toContain('Risk Assessment');
      expect(report).toContain('Detailed Analysis');
      expect(report).toContain('Recommendations');
      expect(report).toContain('Sensitivity Analysis');
    });

    it('should include key metrics in report', () => {
      const outputs = calculateMezzanineFinancing(baseInputs);
      const report = generateMezzanineFinancingAnalysis(baseInputs, outputs);

      expect(report).toContain(outputs.mezzanineRecommendation);
      expect(report).toContain(outputs.totalLTVRatio.toString());
      expect(report).toContain(outputs.debtServiceCoverage.toFixed(2));
    });
  });

  describe('Validation', () => {
    it('should validate all inputs correctly', () => {
      const validationResult = validateAllMezzanineFinancingInputs(baseInputs);
      expect(validationResult.isValid).toBe(true);
    });

    it('should reject invalid project value', () => {
      const invalidInputs = { ...baseInputs, projectValue: 50000 };
      const validationResult = validateAllMezzanineFinancingInputs(invalidInputs);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.message).toContain('Project value');
    });

    it('should reject negative loan amounts', () => {
      const invalidInputs = { ...baseInputs, seniorLoanAmount: -100000 };
      const validationResult = validateAllMezzanineFinancingInputs(invalidInputs);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.message).toContain('Senior loan amount');
    });

    it('should reject excessive loan amounts', () => {
      const invalidInputs = { ...baseInputs, seniorLoanAmount: 6000000 };
      const validationResult = validateAllMezzanineFinancingInputs(invalidInputs);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.message).toContain('Senior loan amount');
    });

    it('should reject invalid interest rates', () => {
      const invalidInputs = { ...baseInputs, mezzanineLoanRate: 35 };
      const validationResult = validateAllMezzanineFinancingInputs(invalidInputs);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.message).toContain('Mezzanine loan rate');
    });

    it('should reject invalid loan terms', () => {
      const invalidInputs = { ...baseInputs, mezzanineLoanTerm: 25 };
      const validationResult = validateAllMezzanineFinancingInputs(invalidInputs);
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.message).toContain('Mezzanine loan term');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero mezzanine debt', () => {
      const inputs = { ...baseInputs, mezzanineLoanAmount: 0, equityContribution: 2000000 };
      const outputs = calculateMezzanineFinancing(inputs);

      expect(outputs.mezzanineLTVRatio).toBe(0);
      expect(outputs.totalLTVRatio).toBe(60);
      expect(outputs.mezzanineLoanPayment).toBe(0);
    });

    it('should handle very high mezzanine rates', () => {
      const inputs = { ...baseInputs, mezzanineLoanRate: 25 };
      const outputs = calculateMezzanineFinancing(inputs);

      expect(outputs.mezzanineCost).toBeGreaterThan(25);
      expect(outputs.mezzanineRiskScore).toBeGreaterThan(70);
    });

    it('should handle very low equity contribution', () => {
      const inputs = { ...baseInputs, equityContribution: 100000 };
      const outputs = calculateMezzanineFinancing(inputs);

      expect(outputs.equityPercentage).toBe(2);
      expect(outputs.mezzanineRiskScore).toBeGreaterThan(70);
    });

    it('should handle very short project timelines', () => {
      const inputs = { ...baseInputs, projectTimeline: 6 };
      const outputs = calculateMezzanineFinancing(inputs);

      expect(outputs.mezzanineRiskScore).toBeDefined();
    });
  });
});
