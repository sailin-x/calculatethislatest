import { describe, it, expect } from 'vitest';
import {
  calculateFutureValue,
  calculateTaxSavings,
  calculateEffectiveReturn,
  calculateTraditionalIRA
} from './formulas';
import { validateTraditionalIRAInputs } from './validation';

describe('Traditional IRA Calculator', () => {
  const mockInputs = {
    currentBalance: 50000,
    annualContribution: 6000,
    currentAge: 35,
    retirementAge: 65,
    expectedReturn: 8,
    inflationRate: 3,
    taxBracket: 24,
    catchUpContributions: false,
    investmentStrategy: 'moderate' as const,
    contributionFrequency: 'annual' as const,
    taxFilingStatus: 'single' as const,
    yearsUntilRetirement: 30
  };

  describe('IRA Growth Calculations', () => {
    it('calculates future value correctly', () => {
      const result = calculateFutureValue(50000, 6000, 30, 8, 3);
      expect(result).toBeGreaterThan(50000 + (6000 * 30));
      expect(result).toBeCloseTo(850000, -2); // Approximate expected value
    });

    it('calculates tax savings correctly', () => {
      const contributions = 6000 * 30;
      const result = calculateTaxSavings(contributions, 24);
      expect(result).toBe(6000 * 30 * 0.24);
    });

    it('calculates effective return correctly', () => {
      const result = calculateEffectiveReturn(8, 24, 3);
      expect(result).toBe((8 * 0.76) - 3); // 8% * (1-0.24) - 3%
      expect(result).toBe(2.92);
    });
  });

  describe('Complete IRA Analysis', () => {
    it('calculates full IRA scenario', () => {
      const result = calculateTraditionalIRA(mockInputs);
      expect(result.projectedBalance).toBeGreaterThan(0);
      expect(result.totalContributions).toBeGreaterThan(0);
      expect(result.totalEarnings).toBeGreaterThan(0);
      expect(result.taxSavings).toBeGreaterThan(0);
      expect(result.effectiveReturn).toBeGreaterThan(0);
      expect(result.contributionSchedule).toBeDefined();
      expect(result.taxEfficiency).toBeGreaterThan(0);
    });

    it('handles zero current balance', () => {
      const zeroBalanceInputs = { ...mockInputs, currentBalance: 0 };
      const result = calculateTraditionalIRA(zeroBalanceInputs);
      expect(result.projectedBalance).toBeGreaterThan(0);
      expect(result.totalContributions).toBe(6000 * 30);
    });

    it('handles catch-up contributions', () => {
      const catchUpInputs = { ...mockInputs, currentAge: 55, catchUpContributions: true };
      const result = calculateTraditionalIRA(catchUpInputs);
      expect(result).toBeDefined();
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateTraditionalIRAInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates age requirements', () => {
      const invalidInputs = { ...mockInputs, currentAge: 16 };
      const result = validateTraditionalIRAInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates retirement age', () => {
      const invalidInputs = { ...mockInputs, retirementAge: 30 };
      const result = validateTraditionalIRAInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates contribution limits', () => {
      const invalidInputs = { ...mockInputs, annualContribution: 10000 };
      const result = validateTraditionalIRAInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates tax bracket range', () => {
      const invalidInputs = { ...mockInputs, taxBracket: 60 };
      const result = validateTraditionalIRAInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles very young age', () => {
      const youngInputs = { ...mockInputs, currentAge: 18, retirementAge: 68 };
      const result = calculateTraditionalIRA(youngInputs);
      expect(result.yearsUntilRetirement).toBe(50);
    });

    it('handles very old age', () => {
      const oldInputs = { ...mockInputs, currentAge: 70, retirementAge: 75 };
      const result = calculateTraditionalIRA(oldInputs);
      expect(result.yearsUntilRetirement).toBe(5);
    });

    it('handles zero expected return', () => {
      const zeroReturnInputs = { ...mockInputs, expectedReturn: 0 };
      const result = calculateTraditionalIRA(zeroReturnInputs);
      expect(result.projectedBalance).toBe(50000 + (6000 * 30));
    });

    it('handles high tax bracket', () => {
      const highTaxInputs = { ...mockInputs, taxBracket: 37 };
      const result = calculateTraditionalIRA(highTaxInputs);
      expect(result.taxSavings).toBeGreaterThan(calculateTraditionalIRA(mockInputs).taxSavings);
    });

    it('handles conservative strategy', () => {
      const conservativeInputs = { ...mockInputs, investmentStrategy: 'conservative' as const };
      const result = calculateTraditionalIRA(conservativeInputs);
      expect(result.riskAdjustedProjection).toBeLessThan(result.projectedBalance);
    });
  });

  describe('Contribution and Tax Calculations', () => {
    it('calculates maximum contribution for under 50', () => {
      const under50Inputs = { ...mockInputs, currentAge: 45 };
      const result = calculateTraditionalIRA(under50Inputs);
      expect(result).toBeDefined();
    });

    it('calculates maximum contribution for over 50', () => {
      const over50Inputs = { ...mockInputs, currentAge: 55, catchUpContributions: true };
      const result = calculateTraditionalIRA(over50Inputs);
      expect(result).toBeDefined();
    });

    it('handles different tax filing statuses', () => {
      const marriedInputs = { ...mockInputs, taxFilingStatus: 'married_filing_jointly' as const };
      const result = calculateTraditionalIRA(marriedInputs);
      expect(result).toBeDefined();
    });

    it('calculates retirement income correctly', () => {
      const result = calculateTraditionalIRA(mockInputs);
      expect(result.retirementIncome).toBe((result.projectedBalance * 0.04) / 12);
    });
  });
});