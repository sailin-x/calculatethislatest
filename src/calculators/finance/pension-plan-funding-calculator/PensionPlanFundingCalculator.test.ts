import { describe, it, expect } from 'vitest';
import { pensionPlanFundingCalculator } from './PensionPlanFundingCalculator';
import { calculatePensionFunding, calculatePensionFundingMetrics, validatePensionFundingInputs } from './formulas';

describe('Pension Plan Funding Calculator', () => {
  describe('calculatePensionFunding', () => {
    it('should calculate pension funding requirements', () => {
      const inputs = {
        currentPlanBalance: 250000,
        targetRetirementBalance: 1000000,
        currentAge: 45,
        retirementAge: 65,
        annualContribution: 15000,
        employerMatch: 6,
        expectedReturn: 7,
        inflationRate: 2.5,
        currentSalary: 90000,
        salaryGrowthRate: 3,
        planType: 'defined_contribution' as const,
        fundingStrategy: 'moderate' as const,
        includeCatchUp: false
      };

      const result = calculatePensionFunding(inputs);

      expect(result.totalContributions).toBeGreaterThan(0);
      expect(result.employerContributions).toBeGreaterThan(0);
      expect(result.investmentGrowth).toBeGreaterThan(0);
      expect(result.projectedBalance).toBeGreaterThan(250000);
      expect(result.retirementReadiness).toBeGreaterThan(0);
    });

    it('should calculate different results for different funding strategies', () => {
      const baseInputs = {
        currentPlanBalance: 200000,
        targetRetirementBalance: 800000,
        currentAge: 50,
        retirementAge: 65,
        annualContribution: 12000,
        employerMatch: 5,
        expectedReturn: 7,
        inflationRate: 2.5,
        currentSalary: 75000,
        salaryGrowthRate: 2,
        planType: 'defined_contribution' as const,
        includeCatchUp: false
      };

      const conservativeResult = calculatePensionFunding({ ...baseInputs, fundingStrategy: 'conservative' });
      const aggressiveResult = calculatePensionFunding({ ...baseInputs, fundingStrategy: 'aggressive' });

      expect(conservativeResult.projectedBalance).toBeGreaterThan(0);
      expect(aggressiveResult.projectedBalance).toBeGreaterThan(0);
    });
  });

  describe('validatePensionFundingInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        currentPlanBalance: 250000,
        targetRetirementBalance: 1000000,
        currentAge: 45,
        retirementAge: 65,
        annualContribution: 15000,
        employerMatch: 6,
        expectedReturn: 7,
        inflationRate: 2.5,
        currentSalary: 90000,
        salaryGrowthRate: 3,
        planType: 'defined_contribution' as const,
        fundingStrategy: 'moderate' as const,
        includeCatchUp: false
      };

      const errors = validatePensionFundingInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should validate retirement age greater than current age', () => {
      const inputs = {
        currentPlanBalance: 250000,
        targetRetirementBalance: 1000000,
        currentAge: 70,
        retirementAge: 65,
        annualContribution: 15000,
        employerMatch: 6,
        expectedReturn: 7,
        inflationRate: 2.5,
        currentSalary: 90000,
        salaryGrowthRate: 3,
        planType: 'defined_contribution' as const,
        fundingStrategy: 'moderate' as const,
        includeCatchUp: false
      };

      const errors = validatePensionFundingInputs(inputs);
      expect(errors).toContain('Retirement age must be greater than current age');
    });
  });

  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(pensionPlanFundingCalculator.id).toBe('pension-plan-funding-calculator');
      expect(pensionPlanFundingCalculator.title).toBe('Pension Plan Funding Calculator');
      expect(pensionPlanFundingCalculator.category).toBe('finance');
      expect(pensionPlanFundingCalculator.subcategory).toBe('Retirement & Savings');
    });

    it('should have required inputs', () => {
      const requiredInputs = pensionPlanFundingCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(10);
    });

    it('should have expected outputs', () => {
      expect(pensionPlanFundingCalculator.outputs).toHaveLength(9);
      const outputIds = pensionPlanFundingCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('totalContributions');
      expect(outputIds).toContain('projectedBalance');
      expect(outputIds).toContain('retirementReadiness');
    });

    it('should have validation rules', () => {
      expect(pensionPlanFundingCalculator.validationRules).toHaveLength(16);
    });

    it('should have examples', () => {
      expect(pensionPlanFundingCalculator.examples).toHaveLength(2);
    });
  });
});