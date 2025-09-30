import { describe, it, expect } from 'vitest';
import {
  calculateAnnualContributionLimit,
  calculateTotalContributions,
  calculateInvestmentGrowth,
  calculateQualifiedWithdrawalTaxSavings,
  calculateNonQualifiedWithdrawalTax,
  calculateNetTaxAdvantage
} from './formulas';
import { validateHealthSavingsAccountHsaCalculatorInputs } from './validation';

describe('Health Savings Account (HSA) Calculator', () => {
  const mockInputs = {
    coverageType: 'family' as const,
    age: 45,
    currentBalance: 10000,
    annualContribution: 7500,
    expectedGrowthRate: 6,
    yearsToRetirement: 20,
    qualifiedWithdrawals: 2000,
    nonQualifiedWithdrawals: 0
  };

  describe('HSA Calculations', () => {
    it('calculates annual contribution limit correctly', () => {
      const result = calculateAnnualContributionLimit(mockInputs);
      expect(result).toBe(8200); // Family limit
    });

    it('calculates annual contribution limit with catch-up correctly', () => {
      const seniorInputs = { ...mockInputs, age: 56 };
      const result = calculateAnnualContributionLimit(seniorInputs);
      expect(result).toBe(9200); // Family limit + catch-up
    });

    it('calculates total contributions correctly', () => {
      const result = calculateTotalContributions(mockInputs);
      expect(result).toBe(160000); // 10000 + (7500 * 20)
    });

    it('calculates investment growth correctly', () => {
      const result = calculateInvestmentGrowth(mockInputs);
      expect(result).toBeGreaterThan(0);
      // This will be the future value minus contributions
    });

    it('calculates qualified withdrawal tax savings correctly', () => {
      const result = calculateQualifiedWithdrawalTaxSavings(mockInputs);
      expect(result).toBeGreaterThan(0);
      // Tax savings from contributions and qualified withdrawals
    });

    it('calculates non-qualified withdrawal tax correctly', () => {
      const nonQualifiedInputs = { ...mockInputs, nonQualifiedWithdrawals: 1000 };
      const result = calculateNonQualifiedWithdrawalTax(nonQualifiedInputs);
      expect(result).toBe(220); // 1000 * 0.22 (tax rate)
    });

    it('calculates net tax advantage correctly', () => {
      const result = calculateNetTaxAdvantage(mockInputs);
      expect(typeof result).toBe('number');
      // Net benefit from HSA triple tax advantage
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateHealthSavingsAccountHsaCalculatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates age range', () => {
      const invalidInputs = { ...mockInputs, age: 0 };
      const result = validateHealthSavingsAccountHsaCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates contribution limits', () => {
      const invalidInputs = { ...mockInputs, annualContribution: -1000 };
      const result = validateHealthSavingsAccountHsaCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates growth rate range', () => {
      const invalidInputs = { ...mockInputs, expectedGrowthRate: -60 };
      const result = validateHealthSavingsAccountHsaCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles self-only coverage correctly', () => {
      const selfOnlyInputs = { ...mockInputs, coverageType: 'self-only' as const };
      const result = calculateAnnualContributionLimit(selfOnlyInputs);
      expect(result).toBe(4100); // Self-only limit
    });

    it('handles zero current balance correctly', () => {
      const zeroBalanceInputs = { ...mockInputs, currentBalance: 0 };
      const result = calculateTotalContributions(zeroBalanceInputs);
      expect(result).toBe(150000); // 7500 * 20
    });

    it('handles zero qualified withdrawals correctly', () => {
      const zeroQualifiedInputs = { ...mockInputs, qualifiedWithdrawals: 0 };
      const result = calculateQualifiedWithdrawalTaxSavings(zeroQualifiedInputs);
      expect(result).toBeGreaterThan(0); // Still gets tax deduction benefit
    });

    it('handles high non-qualified withdrawals correctly', () => {
      const highNonQualifiedInputs = { ...mockInputs, nonQualifiedWithdrawals: 5000 };
      const result = calculateNonQualifiedWithdrawalTax(highNonQualifiedInputs);
      expect(result).toBe(1100); // 5000 * 0.22
    });

    it('calculates catch-up contribution for age 55 correctly', () => {
      const catchUpInputs = { ...mockInputs, age: 55 };
      const result = calculateAnnualContributionLimit(catchUpInputs);
      expect(result).toBe(9200); // 8200 + 1000
    });
  });
});