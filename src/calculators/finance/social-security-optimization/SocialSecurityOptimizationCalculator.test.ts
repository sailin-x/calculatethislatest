import { describe, it, expect } from 'vitest';
import {
  calculateSocialSecurityOptimization,
  calculateBenefitAmount,
  calculateBreakEvenAge,
  findOptimalClaimingAge
} from './formulas';
import { validateSocialSecurityOptimizationInputs } from './validation';

describe('Social Security Optimization Calculator', () => {
  const mockInputs = {
    currentAge: 60,
    retirementAge: 65,
    primaryInsuranceAmount: 2000,
    filingStrategy: 'single' as const,
    expectedLifespan: 85,
    inflationRate: 2.5,
    discountRate: 3,
    currentSavings: 500000,
    monthlyRetirementExpenses: 4000,
    otherIncomeSources: 1000,
    taxBracket: 15
  };

  describe('Benefit Calculations', () => {
    it('calculates benefit amount at full retirement age', () => {
      const result = calculateBenefitAmount(2000, 67);
      expect(result).toBe(2000);
    });

    it('calculates reduced benefit for early claiming', () => {
      const result = calculateBenefitAmount(2000, 62);
      expect(result).toBeLessThan(2000);
      expect(result).toBeCloseTo(1500, 0); // 5/9% reduction per month * 60 months
    });

    it('calculates increased benefit for delayed claiming', () => {
      const result = calculateBenefitAmount(2000, 70);
      expect(result).toBeGreaterThan(2000);
      expect(result).toBeCloseTo(2320, 0); // 8% per year * 3 years
    });

    it('calculates break-even age correctly', () => {
      const result = calculateBreakEvenAge(67, 2000, 70, 2320);
      expect(result).toBeGreaterThan(70);
    });
  });

  describe('Optimization Calculations', () => {
    it('finds optimal claiming age', () => {
      const result = findOptimalClaimingAge(2000, 60, 85, 3, 2.5);
      expect(result).toBeGreaterThanOrEqual(62);
      expect(result).toBeLessThanOrEqual(70);
    });

    it('calculates social security optimization correctly', () => {
      const result = calculateSocialSecurityOptimization(mockInputs);
      expect(result.optimalClaimingAge).toBeDefined();
      expect(result.monthlyBenefit).toBeGreaterThan(0);
      expect(result.netPresentValue).toBeGreaterThan(0);
      expect(result.totalLifetimeBenefits).toBeGreaterThan(0);
    });

    it('calculates strategy comparison', () => {
      const result = calculateSocialSecurityOptimization(mockInputs);
      expect(result.strategyComparison).toBeDefined();
      expect(result.strategyComparison.length).toBeGreaterThan(0);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateSocialSecurityOptimizationInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates age requirements', () => {
      const invalidInputs = { ...mockInputs, currentAge: 15 };
      const result = validateSocialSecurityOptimizationInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates benefit amount limits', () => {
      const invalidInputs = { ...mockInputs, primaryInsuranceAmount: 5000 };
      const result = validateSocialSecurityOptimizationInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates lifespan requirements', () => {
      const invalidInputs = { ...mockInputs, expectedLifespan: 60 };
      const result = validateSocialSecurityOptimizationInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles maximum delayed retirement age', () => {
      const result = calculateBenefitAmount(2000, 70);
      expect(result).toBeCloseTo(2320, 0);
    });

    it('handles minimum claiming age', () => {
      const result = calculateBenefitAmount(2000, 62);
      expect(result).toBeCloseTo(1500, 0);
    });

    it('handles long life expectancy', () => {
      const result = calculateSocialSecurityOptimization({
        ...mockInputs,
        expectedLifespan: 100
      });
      expect(result.optimalClaimingAge).toBe(70); // Should favor delayed claiming
    });

    it('handles short life expectancy', () => {
      const result = calculateSocialSecurityOptimization({
        ...mockInputs,
        expectedLifespan: 75
      });
      expect(result.optimalClaimingAge).toBeLessThanOrEqual(67); // Should favor earlier claiming
    });
  });

  describe('Spousal Benefits', () => {
    const marriedInputs = {
      ...mockInputs,
      spouseCurrentAge: 60,
      spouseRetirementAge: 65,
      spousePrimaryInsuranceAmount: 1200,
      spouseExpectedLifespan: 87,
      filingStrategy: 'married_filing_jointly' as const
    };

    it('calculates spousal benefits for married couples', () => {
      const result = calculateSocialSecurityOptimization(marriedInputs);
      expect(result.spouseOptimalClaimingAge).toBeDefined();
      expect(result.spouseMonthlyBenefit).toBeDefined();
      expect(result.combinedMonthlyBenefit).toBeDefined();
    });

    it('validates spouse information', () => {
      const result = validateSocialSecurityOptimizationInputs(marriedInputs);
      expect(result.length).toBe(0);
    });
  });
});