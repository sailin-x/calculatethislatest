import { describe, it, expect } from 'vitest';
import { iraCalculator } from './IRACalculator';
import { calculateIRA, calculateIRAMetrics, validateIRAInputs } from './formulas';

describe('IRA Calculator', () => {
  describe('calculateIRA', () => {
    it('should calculate Traditional IRA growth', () => {
      const inputs = {
        currentBalance: 50000,
        annualContribution: 7000,
        expectedReturn: 7,
        yearsToRetirement: 25,
        currentAge: 35,
        iraType: 'traditional' as const,
        taxBracket: 25,
        inflationRate: 2.5,
        includeRequiredMinimumDistributions: true,
        spousalIRA: false,
        catchUpContributions: false
      };

      const result = calculateIRA(inputs);

      expect(result.futureValue).toBeGreaterThan(50000);
      expect(result.totalContributions).toBeGreaterThan(0);
      expect(result.totalEarnings).toBeGreaterThan(0);
      expect(result.taxSavings).toBeGreaterThan(0);
      expect(result.requiredMinimumDistribution).toBeGreaterThan(0);
    });

    it('should calculate Roth IRA growth with no tax savings', () => {
      const inputs = {
        currentBalance: 30000,
        annualContribution: 7000,
        expectedReturn: 7,
        yearsToRetirement: 30,
        currentAge: 30,
        iraType: 'roth' as const,
        taxBracket: 25,
        inflationRate: 2.5,
        includeRequiredMinimumDistributions: false,
        spousalIRA: false,
        catchUpContributions: false
      };

      const result = calculateIRA(inputs);

      expect(result.futureValue).toBeGreaterThan(30000);
      expect(result.taxSavings).toBe(0);
      expect(result.requiredMinimumDistribution).toBe(0);
    });
  });

  describe('validateIRAInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        currentBalance: 50000,
        annualContribution: 7000,
        expectedReturn: 7,
        yearsToRetirement: 25,
        currentAge: 35,
        iraType: 'traditional' as const,
        taxBracket: 25,
        inflationRate: 2.5,
        includeRequiredMinimumDistributions: true,
        spousalIRA: false,
        catchUpContributions: false
      };

      const errors = validateIRAInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should validate negative current balance', () => {
      const inputs = {
        currentBalance: -1000,
        annualContribution: 7000,
        expectedReturn: 7,
        yearsToRetirement: 25,
        currentAge: 35,
        iraType: 'traditional' as const,
        taxBracket: 25,
        inflationRate: 2.5,
        includeRequiredMinimumDistributions: true,
        spousalIRA: false,
        catchUpContributions: false
      };

      const errors = validateIRAInputs(inputs);
      expect(errors).toContain('Current balance cannot be negative');
    });
  });

  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(iraCalculator.id).toBe('ira-calculator');
      expect(iraCalculator.title).toBe('IRA Calculator');
      expect(iraCalculator.category).toBe('finance');
      expect(iraCalculator.subcategory).toBe('Retirement & Savings');
    });

    it('should have required inputs', () => {
      const requiredInputs = iraCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(7);
    });

    it('should have expected outputs', () => {
      expect(iraCalculator.outputs).toHaveLength(9);
      const outputIds = iraCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('futureValue');
      expect(outputIds).toContain('taxSavings');
      expect(outputIds).toContain('retirementIncome');
    });

    it('should have validation rules', () => {
      expect(iraCalculator.validationRules).toHaveLength(15);
    });

    it('should have examples', () => {
      expect(iraCalculator.examples).toHaveLength(2);
    });
  });
});