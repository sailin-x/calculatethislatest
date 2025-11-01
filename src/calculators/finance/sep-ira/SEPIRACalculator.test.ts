import { describe, it, expect } from 'vitest';
import { calculateSEPIRA, calculateSEPContributionLimit } from './formulas';
import { validateSEPIRAInputs } from './validation';

describe('SEP IRA Calculator', () => {
  describe('Contribution Limit Calculations', () => {
    it('calculates contribution limit as 25% of self-employment income', () => {
      const result = calculateSEPContributionLimit(100000);
      expect(result).toBe(25000);
    });

    it('caps contribution limit at $69,000 for 2024', () => {
      const result = calculateSEPContributionLimit(300000); // 25% = 75,000, but capped at 69,000
      expect(result).toBe(69000);
    });

    it('handles zero income', () => {
      const result = calculateSEPContributionLimit(0);
      expect(result).toBe(0);
    });
  });

  describe('SEP IRA Calculations', () => {
    it('calculates SEP IRA growth correctly', () => {
      const inputs = {
        selfEmploymentIncome: 100000,
        employerContribution: 20000,
        employeeContribution: 5000,
        expectedAnnualReturn: 7,
        yearsToContribute: 20,
        currentBalance: 0,
        taxBracket: 32,
        filingStatus: 'single' as const,
        numberOfEmployees: 0,
        businessType: 'sole_proprietorship' as const
      };
      const result = calculateSEPIRA(inputs);
      expect(result.futureValue).toBeGreaterThan(500000);
      expect(result.totalContributions).toBe(500000); // 25,000 * 20
      expect(result.totalEarnings).toBe(result.futureValue - result.totalContributions);
    });

    it('respects contribution limits', () => {
      const inputs = {
        selfEmploymentIncome: 100000,
        employerContribution: 30000, // Over limit
        employeeContribution: 0,
        expectedAnnualReturn: 7,
        yearsToContribute: 10,
        currentBalance: 0,
        taxBracket: 32,
        filingStatus: 'single' as const,
        numberOfEmployees: 0,
        businessType: 'sole_proprietorship' as const
      };
      const result = calculateSEPIRA(inputs);
      expect(result.totalEmployerContribution).toBe(250000); // Limited to 25,000 * 10
    });
  });

  describe('Tax Savings Calculations', () => {
    it('calculates tax savings from employer contributions', () => {
      const inputs = {
        selfEmploymentIncome: 100000,
        employerContribution: 25000,
        employeeContribution: 0,
        expectedAnnualReturn: 7,
        yearsToContribute: 1,
        currentBalance: 0,
        taxBracket: 32,
        filingStatus: 'single' as const,
        numberOfEmployees: 0,
        businessType: 'sole_proprietorship' as const
      };
      const result = calculateSEPIRA(inputs);
      expect(result.taxSavings).toBe(8000); // 25,000 * 0.32
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const inputs = {
        selfEmploymentIncome: 100000,
        employerContribution: 20000,
        employeeContribution: 5000,
        expectedAnnualReturn: 7,
        yearsToContribute: 20,
        currentBalance: 0,
        taxBracket: 32,
        filingStatus: 'single' as const,
        numberOfEmployees: 0,
        businessType: 'sole_proprietorship' as const
      };
      const result = validateSEPIRAInputs(inputs);
      expect(result.length).toBe(0);
    });

    it('validates self-employment income', () => {
      const inputs = {
        selfEmploymentIncome: 0,
        employerContribution: 20000,
        employeeContribution: 5000,
        expectedAnnualReturn: 7,
        yearsToContribute: 20,
        currentBalance: 0,
        taxBracket: 32,
        filingStatus: 'single' as const,
        numberOfEmployees: 0,
        businessType: 'sole_proprietorship' as const
      };
      const result = validateSEPIRAInputs(inputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].message).toContain('greater than 0');
    });

    it('validates business type', () => {
      const inputs = {
        selfEmploymentIncome: 100000,
        employerContribution: 20000,
        employeeContribution: 5000,
        expectedAnnualReturn: 7,
        yearsToContribute: 20,
        currentBalance: 0,
        taxBracket: 32,
        filingStatus: 'single' as const,
        numberOfEmployees: 0,
        businessType: 'invalid_type' as any
      };
      const result = validateSEPIRAInputs(inputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].message).toContain('valid business type');
    });
  });

  describe('Projection Calculations', () => {
    it('generates balance projections by year', () => {
      const inputs = {
        selfEmploymentIncome: 100000,
        employerContribution: 20000,
        employeeContribution: 5000,
        expectedAnnualReturn: 7,
        yearsToContribute: 5,
        currentBalance: 10000,
        taxBracket: 32,
        filingStatus: 'single' as const,
        numberOfEmployees: 0,
        businessType: 'sole_proprietorship' as const
      };
      const result = calculateSEPIRA(inputs);
      expect(result.projectedBalanceByYear).toHaveLength(6); // Current + 5 years
      expect(result.projectedBalanceByYear[0].year).toBe(0);
      expect(result.projectedBalanceByYear[5].year).toBe(5);
      expect(result.projectedBalanceByYear[0].balance).toBe(10000);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero contributions', () => {
      const inputs = {
        selfEmploymentIncome: 100000,
        employerContribution: 0,
        employeeContribution: 0,
        expectedAnnualReturn: 7,
        yearsToContribute: 20,
        currentBalance: 50000,
        taxBracket: 32,
        filingStatus: 'single' as const,
        numberOfEmployees: 0,
        businessType: 'sole_proprietorship' as const
      };
      const result = calculateSEPIRA(inputs);
      expect(result.futureValue).toBeGreaterThan(50000);
      expect(result.totalContributions).toBe(50000);
    });

    it('handles corporation business type', () => {
      const inputs = {
        selfEmploymentIncome: 200000,
        employerContribution: 40000,
        employeeContribution: 0,
        expectedAnnualReturn: 7,
        yearsToContribute: 10,
        currentBalance: 0,
        taxBracket: 35,
        filingStatus: 'single' as const,
        numberOfEmployees: 5,
        businessType: 'corporation' as const
      };
      const result = calculateSEPIRA(inputs);
      expect(result.eligibilityStatus).toContain('typically for self-employed');
    });

    it('handles very high self-employment income', () => {
      const result = calculateSEPContributionLimit(300000);
      expect(result).toBe(69000); // Capped at limit
    });
  });
});