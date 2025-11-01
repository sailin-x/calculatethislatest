import { describe, it, expect } from 'vitest';
import { healthSavingsAccountCalculator } from './HealthSavingsAccountCalculator';
import { calculateHSA, calculateHSAMetrics, validateHSAInputs } from './formulas';

describe('Health Savings Account (HSA) Calculator', () => {
  describe('calculateHSA', () => {
    it('should calculate HSA growth and tax benefits', () => {
      const inputs = {
        annualContribution: 4000,
        currentBalance: 10000,
        age: 35,
        coverageType: 'self-only' as const,
        contributionType: 'employee' as const,
        investmentReturn: 7,
        inflationRate: 2.5,
        yearsUntilRetirement: 30,
        qualifiedExpenses: 2000,
        nonQualifiedWithdrawals: 0,
        penaltyRate: 20,
        incomeTaxRate: 25
      };

      const result = calculateHSA(inputs);

      expect(result.totalContributions).toBe(130000);
      expect(result.totalBalance).toBeGreaterThan(130000);
      expect(result.taxSavings).toBeGreaterThan(0);
      expect(result.netBenefit).toBe(2000);
    });

    it('should handle non-qualified withdrawals with penalties', () => {
      const inputs = {
        annualContribution: 4000,
        currentBalance: 10000,
        age: 35,
        coverageType: 'self-only' as const,
        contributionType: 'employee' as const,
        investmentReturn: 7,
        inflationRate: 2.5,
        yearsUntilRetirement: 30,
        qualifiedExpenses: 0,
        nonQualifiedWithdrawals: 1000,
        penaltyRate: 20,
        incomeTaxRate: 25
      };

      const result = calculateHSA(inputs);

      expect(result.penaltiesPaid).toBe(200);
      expect(result.taxesPaid).toBe(250);
      expect(result.netBenefit).toBe(550);
    });
  });

  describe('validateHSAInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        annualContribution: 4000,
        currentBalance: 10000,
        age: 35,
        coverageType: 'self-only' as const,
        contributionType: 'employee' as const,
        investmentReturn: 7,
        inflationRate: 2.5,
        yearsUntilRetirement: 30,
        qualifiedExpenses: 2000,
        nonQualifiedWithdrawals: 0,
        penaltyRate: 20,
        incomeTaxRate: 25
      };

      const errors = validateHSAInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should validate negative contribution', () => {
      const inputs = {
        annualContribution: -1000,
        currentBalance: 10000,
        age: 35,
        coverageType: 'self-only' as const,
        contributionType: 'employee' as const,
        investmentReturn: 7,
        inflationRate: 2.5,
        yearsUntilRetirement: 30,
        qualifiedExpenses: 2000,
        nonQualifiedWithdrawals: 0,
        penaltyRate: 20,
        incomeTaxRate: 25
      };

      const errors = validateHSAInputs(inputs);
      expect(errors).toContain('Annual contribution must be greater than $0');
    });
  });

  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(healthSavingsAccountCalculator.id).toBe('HealthSavingsAccount-hsa-calculator');
      expect(healthSavingsAccountCalculator.title).toBe('Health Savings Account (HSA) Calculator');
      expect(healthSavingsAccountCalculator.category).toBe('finance');
      expect(healthSavingsAccountCalculator.subcategory).toBe('Retirement & Savings');
    });

    it('should have required inputs', () => {
      const requiredInputs = healthSavingsAccountCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(8);
    });

    it('should have expected outputs', () => {
      expect(healthSavingsAccountCalculator.outputs).toHaveLength(11);
      const outputIds = healthSavingsAccountCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('totalContributions');
      expect(outputIds).toContain('taxSavings');
      expect(outputIds).toContain('futureValue');
    });

    it('should have validation rules', () => {
      expect(healthSavingsAccountCalculator.validationRules).toHaveLength(13);
    });

    it('should have examples', () => {
      expect(healthSavingsAccountCalculator.examples).toHaveLength(2);
    });
  });
});