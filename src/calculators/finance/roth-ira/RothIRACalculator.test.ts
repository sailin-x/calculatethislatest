import { describe, it, expect } from 'vitest';
import { calculateRothIRA, calculateFutureValueAnnuity, getContributionLimit, checkEligibility } from './formulas';
import { validateRothIRAInputs } from './validation';

describe('Roth IRA Calculator', () => {
  describe('Future Value Calculations', () => {
    it('calculates future value of annuity correctly', () => {
      const result = calculateFutureValueAnnuity(1000, 7, 10);
      expect(result).toBeGreaterThan(10000);
      expect(result).toBeCloseTo(13970, 0);
    });

    it('calculates Roth IRA growth correctly', () => {
      const inputs = {
        currentAge: 30,
        annualContribution: 6000,
        expectedAnnualReturn: 7,
        yearsToContribute: 30,
        currentBalance: 0,
        taxBracket: 25,
        inflationRate: 3,
        filingStatus: 'single' as const,
        income: 80000
      };
      const result = calculateRothIRA(inputs);
      expect(result.futureValue).toBeGreaterThan(500000);
      expect(result.totalContributions).toBe(180000);
      expect(result.totalEarnings).toBe(result.futureValue - result.totalContributions);
    });
  });

  describe('Contribution Limits', () => {
    it('returns correct contribution limit for under 50', () => {
      const result = getContributionLimit('single', 45);
      expect(result).toBe(7500);
    });

    it('returns correct contribution limit for 50 and over', () => {
      const result = getContributionLimit('single', 52);
      expect(result).toBe(8500);
    });

    it('returns correct limit for married filing jointly', () => {
      const result = getContributionLimit('married_filing_jointly', 45);
      expect(result).toBe(7500);
    });
  });

  describe('Eligibility Checks', () => {
    it('determines eligibility for low income', () => {
      const result = checkEligibility(80000, 'single', 45);
      expect(result.eligible).toBe(true);
      expect(result.reason).toContain('within limits');
    });

    it('determines ineligibility for high income', () => {
      const result = checkEligibility(200000, 'single', 45);
      expect(result.eligible).toBe(false);
      expect(result.reason).toContain('exceeds limit');
    });

    it('considers age for 50+ eligibility', () => {
      const result = checkEligibility(155000, 'single', 52);
      expect(result.eligible).toBe(false);
      expect(result.reason).toContain('161,000');
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const inputs = {
        currentAge: 30,
        annualContribution: 6000,
        expectedAnnualReturn: 7,
        yearsToContribute: 30,
        currentBalance: 0,
        taxBracket: 25,
        inflationRate: 3,
        filingStatus: 'single' as const,
        income: 80000
      };
      const result = validateRothIRAInputs(inputs);
      expect(result.length).toBe(0);
    });

    it('validates age requirements', () => {
      const inputs = {
        currentAge: 16,
        annualContribution: 6000,
        expectedAnnualReturn: 7,
        yearsToContribute: 30,
        currentBalance: 0,
        taxBracket: 25,
        inflationRate: 3,
        filingStatus: 'single' as const,
        income: 80000
      };
      const result = validateRothIRAInputs(inputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].message).toContain('18 or older');
    });

    it('validates contribution limits', () => {
      const inputs = {
        currentAge: 30,
        annualContribution: 150000,
        expectedAnnualReturn: 7,
        yearsToContribute: 30,
        currentBalance: 0,
        taxBracket: 25,
        inflationRate: 3,
        filingStatus: 'single' as const,
        income: 80000
      };
      const result = validateRothIRAInputs(inputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].message).toContain('exceed $100,000');
    });

    it('validates filing status', () => {
      const inputs = {
        currentAge: 30,
        annualContribution: 6000,
        expectedAnnualReturn: 7,
        yearsToContribute: 30,
        currentBalance: 0,
        taxBracket: 25,
        inflationRate: 3,
        filingStatus: 'invalid_status' as any,
        income: 80000
      };
      const result = validateRothIRAInputs(inputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].message).toContain('valid filing status');
    });
  });

  describe('Tax Savings Calculations', () => {
    it('calculates tax savings correctly', () => {
      const inputs = {
        currentAge: 30,
        annualContribution: 6000,
        expectedAnnualReturn: 7,
        yearsToContribute: 30,
        currentBalance: 0,
        taxBracket: 25,
        inflationRate: 3,
        filingStatus: 'single' as const,
        income: 80000
      };
      const result = calculateRothIRA(inputs);
      expect(result.taxSavings).toBe(result.totalEarnings * 0.25);
    });
  });

  describe('Projection Calculations', () => {
    it('generates balance projections by age', () => {
      const inputs = {
        currentAge: 30,
        annualContribution: 6000,
        expectedAnnualReturn: 7,
        yearsToContribute: 5,
        currentBalance: 10000,
        taxBracket: 25,
        inflationRate: 3,
        filingStatus: 'single' as const,
        income: 80000
      };
      const result = calculateRothIRA(inputs);
      expect(result.projectedBalanceByAge).toHaveLength(6); // Current + 5 years
      expect(result.projectedBalanceByAge[0].age).toBe(30);
      expect(result.projectedBalanceByAge[5].age).toBe(35);
      expect(result.projectedBalanceByAge[0].balance).toBe(10000);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero contributions', () => {
      const inputs = {
        currentAge: 30,
        annualContribution: 0,
        expectedAnnualReturn: 7,
        yearsToContribute: 30,
        currentBalance: 100000,
        taxBracket: 25,
        inflationRate: 3,
        filingStatus: 'single' as const,
        income: 80000
      };
      const result = calculateRothIRA(inputs);
      expect(result.futureValue).toBeGreaterThan(100000);
      expect(result.totalContributions).toBe(100000);
    });

    it('handles very high returns', () => {
      const inputs = {
        currentAge: 30,
        annualContribution: 6000,
        expectedAnnualReturn: 12,
        yearsToContribute: 20,
        currentBalance: 0,
        taxBracket: 25,
        inflationRate: 3,
        filingStatus: 'single' as const,
        income: 80000
      };
      const result = calculateRothIRA(inputs);
      expect(result.futureValue).toBeGreaterThan(result.totalContributions);
    });

    it('handles age 70+ (no contributions allowed)', () => {
      const inputs = {
        currentAge: 72,
        annualContribution: 6000,
        expectedAnnualReturn: 7,
        yearsToContribute: 10,
        currentBalance: 500000,
        taxBracket: 25,
        inflationRate: 3,
        filingStatus: 'single' as const,
        income: 80000
      };
      const result = calculateRothIRA(inputs);
      expect(result.contributionLimitReached).toBe(true);
    });
  });
});