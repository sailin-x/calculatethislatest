import { describe, it, expect } from 'vitest';
import { retirementSavingsCalculator } from './RetirementSavingsCalculator';
import { calculateRetirementSavings, calculateRetirementSavingsMetrics, validateRetirementSavingsInputs } from './formulas';

describe('Retirement Savings Calculator', () => {
  describe('calculateRetirementSavings', () => {
    it('should calculate retirement savings for early saver', () => {
      const inputs = {
        currentAge: 35,
        retirementAge: 65,
        currentSavings: 150000,
        monthlyContribution: 800,
        expectedReturn: 7,
        inflationRate: 2.5,
        retirementIncomeNeeded: 60000,
        socialSecurityBenefit: 20000,
        taxBracket: 25,
        contributionFrequency: 'monthly' as const,
        accountType: '401k' as const,
        employerMatch: 50,
        employerMatchLimit: 6000
      };

      const result = calculateRetirementSavings(inputs);

      expect(result.totalSavingsAtRetirement).toBeGreaterThan(0);
      expect(result.yearsToRetirement).toBe(30);
      expect(result.retirementReadinessScore).toBeGreaterThan(0);
      expect(result.replacementRatio).toBeGreaterThan(0);
      expect(typeof result.savingsStrategy).toBe('string');
    });

    it('should calculate retirement savings for late starter', () => {
      const inputs = {
        currentAge: 50,
        retirementAge: 65,
        currentSavings: 50000,
        monthlyContribution: 300,
        expectedReturn: 6,
        inflationRate: 2.5,
        retirementIncomeNeeded: 50000,
        socialSecurityBenefit: 18000,
        taxBracket: 28,
        contributionFrequency: 'monthly' as const,
        accountType: 'traditional_ira' as const,
        employerMatch: 0,
        employerMatchLimit: 0
      };

      const result = calculateRetirementSavings(inputs);

      expect(result.totalSavingsAtRetirement).toBeGreaterThan(0);
      expect(result.yearsToRetirement).toBe(15);
      expect(result.savingsGap).toBeGreaterThan(0);
      expect(result.retirementReadinessScore).toBeLessThan(50);
    });
  });

  describe('validateRetirementSavingsInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        currentAge: 35,
        retirementAge: 65,
        currentSavings: 150000,
        monthlyContribution: 800,
        expectedReturn: 7,
        inflationRate: 2.5,
        retirementIncomeNeeded: 60000,
        socialSecurityBenefit: 20000,
        taxBracket: 25,
        contributionFrequency: 'monthly' as const,
        accountType: '401k' as const,
        employerMatch: 50,
        employerMatchLimit: 6000
      };

      const errors = validateRetirementSavingsInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should validate retirement age greater than current age', () => {
      const inputs = {
        currentAge: 70,
        retirementAge: 65,
        currentSavings: 150000,
        monthlyContribution: 800,
        expectedReturn: 7,
        inflationRate: 2.5,
        retirementIncomeNeeded: 60000,
        socialSecurityBenefit: 20000,
        taxBracket: 25,
        contributionFrequency: 'monthly' as const,
        accountType: '401k' as const,
        employerMatch: 50,
        employerMatchLimit: 6000
      };

      const errors = validateRetirementSavingsInputs(inputs);
      expect(errors).toContain('Retirement age must be greater than current age');
    });
  });

  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(retirementSavingsCalculator.id).toBe('retirement-savings-calculator');
      expect(retirementSavingsCalculator.title).toBe('Retirement Savings Calculator');
      expect(retirementSavingsCalculator.category).toBe('finance');
      expect(retirementSavingsCalculator.subcategory).toBe('Retirement & Savings');
    });

    it('should have required inputs', () => {
      const requiredInputs = retirementSavingsCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(9);
    });

    it('should have expected outputs', () => {
      expect(retirementSavingsCalculator.outputs).toHaveLength(9);
      const outputIds = retirementSavingsCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('totalSavingsAtRetirement');
      expect(outputIds).toContain('retirementReadinessScore');
      expect(outputIds).toContain('savingsStrategy');
    });

    it('should have validation rules', () => {
      expect(retirementSavingsCalculator.validationRules).toHaveLength(16);
    });

    it('should have examples', () => {
      expect(retirementSavingsCalculator.examples).toHaveLength(2);
    });
  });
});