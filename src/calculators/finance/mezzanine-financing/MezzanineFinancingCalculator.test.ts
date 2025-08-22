import { describe, it, expect } from 'vitest';
import { calculateMezzanineFinancing, generateMezzanineFinancingAnalysis } from './formulas';
import { validateMezzanineFinancingInputs } from './validation';
import { quickValidateMezzanineFinancing } from './quickValidation';
import { MezzanineFinancingInputs } from './validation';

describe('Mezzanine Financing Calculator', () => {
  const validInputs: MezzanineFinancingInputs = {
    projectValue: 10000000,
    seniorLoanAmount: 6000000,
    mezzanineLoanAmount: 2000000,
    equityInvestment: 2000000,
    seniorLoanRate: 5.5,
    mezzanineLoanRate: 12,
    seniorLoanTerm: 30,
    mezzanineLoanTerm: 5,
    projectTimeline: 24,
    stabilizedNOI: 800000,
    exitValue: 12000000,
    exitTimeline: 5,
    projectType: 'Commercial',
    propertyType: 'Office Building',
    location: 'Urban',
    marketCondition: 'Stable',
    lenderType: 'Private Equity',
    borrowerCreditScore: 750,
    borrowerExperience: 'Experienced',
    preLeasing: 'Partial',
    preLeasingPercentage: 30,
    environmentalIssues: 'None',
    zoningIssues: 'None',
    constructionRisk: 'Moderate',
    marketRisk: 'Low',
    exitStrategy: 'Sale',
    seniorLenderApproval: 'Approved',
    mezzanineFees: 100000,
    mezzaninePoints: 2,
    prepaymentPenalty: 5,
    guaranteeRequired: 'Partial'
  };

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const result = validateMezzanineFinancingInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject invalid project value', () => {
      const invalidInputs = { ...validInputs, projectValue: 0 };
      const result = validateMezzanineFinancingInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Project value must be greater than 0');
    });

    it('should reject total debt exceeding project value', () => {
      const invalidInputs = { ...validInputs, mezzanineLoanAmount: 5000000 };
      const result = validateMezzanineFinancingInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Total debt (senior + mezzanine) cannot exceed project value');
    });

    it('should reject mezzanine rate lower than senior rate', () => {
      const invalidInputs = { ...validInputs, mezzanineLoanRate: 4 };
      const result = validateMezzanineFinancingInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Mezzanine loan rate should be higher than senior loan rate');
    });

    it('should reject mezzanine term longer than senior term', () => {
      const invalidInputs = { ...validInputs, mezzanineLoanTerm: 35 };
      const result = validateMezzanineFinancingInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Mezzanine loan term should not exceed senior loan term');
    });

    it('should reject excessive senior leverage', () => {
      const invalidInputs = { ...validInputs, seniorLoanAmount: 8000000 };
      const result = validateMezzanineFinancingInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Senior leverage should typically not exceed 75% of project value');
    });

    it('should reject excessive total leverage', () => {
      const invalidInputs = { ...validInputs, mezzanineLoanAmount: 3000000 };
      const result = validateMezzanineFinancingInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Total leverage should typically not exceed 90% of project value');
    });

    it('should reject low DSCR', () => {
      const invalidInputs = { ...validInputs, stabilizedNOI: 400000 };
      const result = validateMezzanineFinancingInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Debt service coverage ratio should be at least 1.0 for mezzanine financing');
    });
  });

  describe('Quick Validation', () => {
    it('should pass quick validation with valid inputs', () => {
      const result = quickValidateMezzanineFinancing(validInputs);
      expect(result).toBe(true);
    });

    it('should fail quick validation with missing required fields', () => {
      const invalidInputs = { ...validInputs, projectValue: 0 };
      const result = quickValidateMezzanineFinancing(invalidInputs);
      expect(result).toBe(false);
    });

    it('should fail quick validation with total debt exceeding project value', () => {
      const invalidInputs = { ...validInputs, mezzanineLoanAmount: 5000000 };
      const result = quickValidateMezzanineFinancing(invalidInputs);
      expect(result).toBe(false);
    });
  });

  describe('Calculations', () => {
    it('should calculate basic mezzanine financing metrics', () => {
      const result = calculateMezzanineFinancing(validInputs);
      
      expect(result.totalCapitalization).toBe(10000000);
      expect(result.seniorLeverage).toBeCloseTo(60, 1);
      expect(result.mezzanineLeverage).toBeCloseTo(20, 1);
      expect(result.totalLeverage).toBeCloseTo(80, 1);
      expect(result.equityPercentage).toBeCloseTo(20, 1);
    });

    it('should calculate debt service payments', () => {
      const result = calculateMezzanineFinancing(validInputs);
      
      expect(result.seniorMonthlyPayment).toBeGreaterThan(0);
      expect(result.mezzanineMonthlyPayment).toBeGreaterThan(0);
      expect(result.totalMonthlyPayment).toBeGreaterThan(0);
      expect(result.totalMonthlyPayment).toBeCloseTo(
        result.seniorMonthlyPayment + result.mezzanineMonthlyPayment, 2
      );
    });

    it('should calculate DSCR correctly', () => {
      const result = calculateMezzanineFinancing(validInputs);
      
      expect(result.debtServiceCoverageRatio).toBeGreaterThan(1);
      expect(result.interestCoverageRatio).toBeGreaterThan(1);
    });

    it('should calculate leverage ratios', () => {
      const result = calculateMezzanineFinancing(validInputs);
      
      expect(result.loanToCostRatio).toBeCloseTo(80, 1);
      expect(result.loanToValueRatio).toBeCloseTo(80, 1);
    });

    it('should calculate financing costs', () => {
      const result = calculateMezzanineFinancing(validInputs);
      
      expect(result.mezzanineCost).toBeGreaterThan(0);
      expect(result.mezzanineCostPercentage).toBeGreaterThan(0);
      expect(result.totalFinancingCost).toBeGreaterThan(0);
      expect(result.weightedAverageCost).toBeGreaterThan(0);
    });

    it('should calculate projected returns', () => {
      const result = calculateMezzanineFinancing(validInputs);
      
      expect(result.projectedIRR).toBeGreaterThan(0);
      expect(result.projectedROE).toBeGreaterThan(0);
      expect(result.projectedROI).toBeGreaterThan(0);
    });

    it('should calculate risk and feasibility scores', () => {
      const result = calculateMezzanineFinancing(validInputs);
      
      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(100);
      expect(result.feasibilityScore).toBeGreaterThanOrEqual(0);
      expect(result.feasibilityScore).toBeLessThanOrEqual(100);
    });

    it('should calculate approval probability', () => {
      const result = calculateMezzanineFinancing(validInputs);
      
      expect(result.approvalProbability).toBeGreaterThanOrEqual(0);
      expect(result.approvalProbability).toBeLessThanOrEqual(100);
    });

    it('should generate break-even analysis', () => {
      const result = calculateMezzanineFinancing(validInputs);
      
      expect(result.breakEvenAnalysis).toBeDefined();
      expect(typeof result.breakEvenAnalysis).toBe('object');
    });

    it('should generate sensitivity analysis', () => {
      const result = calculateMezzanineFinancing(validInputs);
      
      expect(result.sensitivityAnalysis).toBeDefined();
      expect(typeof result.sensitivityAnalysis).toBe('object');
    });

    it('should generate key metrics', () => {
      const result = calculateMezzanineFinancing(validInputs);
      
      expect(result.keyMetrics).toBeDefined();
      expect(typeof result.keyMetrics).toBe('object');
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const outputs = calculateMezzanineFinancing(validInputs);
      const report = generateMezzanineFinancingAnalysis(validInputs, outputs);
      
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
      expect(report.length).toBeGreaterThan(100);
    });

    it('should include key metrics in report', () => {
      const outputs = calculateMezzanineFinancing(validInputs);
      const report = generateMezzanineFinancingAnalysis(validInputs, outputs);
      
      expect(report).toContain('Total Capitalization');
      expect(report).toContain('Senior Leverage');
      expect(report).toContain('Mezzanine Leverage');
      expect(report).toContain('DSCR');
      expect(report).toContain('Risk Score');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero equity investment', () => {
      const inputs = { ...validInputs, equityInvestment: 0 };
      const result = calculateMezzanineFinancing(inputs);
      
      expect(result.equityPercentage).toBe(0);
      expect(result.totalCapitalization).toBe(8000000);
    });

    it('should handle missing optional fields', () => {
      const minimalInputs = {
        projectValue: 10000000,
        seniorLoanAmount: 6000000,
        mezzanineLoanAmount: 2000000,
        seniorLoanRate: 5.5,
        mezzanineLoanRate: 12,
        seniorLoanTerm: 30,
        mezzanineLoanTerm: 5
      };
      
      const result = calculateMezzanineFinancing(minimalInputs);
      expect(result).toBeDefined();
      expect(result.totalCapitalization).toBe(8000000);
    });

    it('should handle high-risk scenarios', () => {
      const highRiskInputs = {
        ...validInputs,
        constructionRisk: 'Very High',
        marketRisk: 'Very High',
        borrowerExperience: 'Novice',
        environmentalIssues: 'Significant'
      };
      
      const result = calculateMezzanineFinancing(highRiskInputs);
      expect(result.riskScore).toBeGreaterThan(70);
      expect(result.approvalProbability).toBeLessThan(50);
    });

    it('should handle low-risk scenarios', () => {
      const lowRiskInputs = {
        ...validInputs,
        constructionRisk: 'Low',
        marketRisk: 'Low',
        borrowerExperience: 'Expert',
        environmentalIssues: 'None',
        preLeasing: 'Fully Leased',
        preLeasingPercentage: 100
      };
      
      const result = calculateMezzanineFinancing(lowRiskInputs);
      expect(result.riskScore).toBeLessThan(30);
      expect(result.approvalProbability).toBeGreaterThan(80);
    });
  });
});