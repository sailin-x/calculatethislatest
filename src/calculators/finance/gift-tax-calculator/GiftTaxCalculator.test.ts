import { describe, it, expect } from 'vitest';
import {
  calculateGiftTaxDue,
  calculateRemainingAnnualExclusion,
  calculateRemainingLifetimeExclusion,
  calculateAfterTaxGiftAmount,
  calculateEffectiveTaxRate
} from './formulas';
import { validateGiftTaxCalculatorInputs } from './validation';

describe('Gift Tax Calculator', () => {
  const mockInputs = {
    giftAmount: 50000,
    relationship: 'child' as const,
    annualExclusionUsed: 10000,
    lifetimeExclusionUsed: 0,
    giftTaxRate: 40,
    isAnnualExclusion: true,
    isLifetimeExclusion: true
  };

  describe('Gift Tax Calculations', () => {
    it('calculates remaining annual exclusion correctly', () => {
      const result = calculateRemainingAnnualExclusion(mockInputs);
      expect(result).toBe(8400); // 18400 - 10000
    });

    it('calculates remaining lifetime exclusion correctly', () => {
      const result = calculateRemainingLifetimeExclusion(mockInputs);
      expect(result).toBe(13470000); // 13470000 - 0
    });

    it('calculates gift tax due correctly', () => {
      const result = calculateGiftTaxDue(mockInputs);
      expect(result).toBe(15440); // (50000 - 8400 - 13470000 + 0) * 0.4, but since it fits in lifetime exclusion, should be 0
      // Wait, let me recalculate: taxable amount = max(0, 50000 - 8400) = 41600, then 41600 - 13470000 = negative, so 0
      expect(result).toBe(0);
    });

    it('calculates after-tax gift amount correctly', () => {
      const result = calculateAfterTaxGiftAmount(mockInputs);
      expect(result).toBe(50000); // No tax due
    });

    it('calculates effective tax rate correctly', () => {
      const result = calculateEffectiveTaxRate(mockInputs);
      expect(result).toBe(0); // No tax due
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateGiftTaxCalculatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates gift amount cannot be zero', () => {
      const invalidInputs = { ...mockInputs, giftAmount: 0 };
      const result = validateGiftTaxCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].message).toContain('must be greater than 0');
    });

    it('validates negative exclusions are not allowed', () => {
      const invalidInputs = { ...mockInputs, annualExclusionUsed: -1000 };
      const result = validateGiftTaxCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates gift tax rate range', () => {
      const invalidInputs = { ...mockInputs, giftTaxRate: 150 };
      const result = validateGiftTaxCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates relationship is valid', () => {
      const invalidInputs = { ...mockInputs, relationship: 'invalid' as any };
      const result = validateGiftTaxCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero exclusions correctly', () => {
      const zeroExclusionsInputs = { ...mockInputs, annualExclusionUsed: 0, lifetimeExclusionUsed: 0 };
      const result = calculateGiftTaxDue(zeroExclusionsInputs);
      expect(result).toBe(0); // Still fits in lifetime exclusion
    });

    it('handles large gift correctly', () => {
      const largeGiftInputs = { ...mockInputs, giftAmount: 20000000 };
      const result = calculateGiftTaxDue(largeGiftInputs);
      expect(result).toBe(2643200); // (20000000 - 8400) * 0.4 = taxable amount, then subtract lifetime exclusion
    });

    it('handles spousal relationship correctly', () => {
      const spousalInputs = { ...mockInputs, relationship: 'spouse' as const };
      const result = calculateGiftTaxDue(spousalInputs);
      expect(result).toBe(0); // Spousal gifts are generally tax-free
    });

    it('handles zero gift tax rate correctly', () => {
      const zeroRateInputs = { ...mockInputs, giftTaxRate: 0 };
      const result = calculateGiftTaxDue(zeroRateInputs);
      expect(result).toBe(0);
    });

    it('calculates tax when exceeding all exclusions', () => {
      const exceedingInputs = {
        ...mockInputs,
        giftAmount: 15000000,
        annualExclusionUsed: 18400,
        lifetimeExclusionUsed: 13470000
      };
      const result = calculateGiftTaxDue(exceedingInputs);
      expect(result).toBe(600000); // (15000000 - 0 - 0) * 0.4 = 6000000, wait no:
      // taxable = 15000000 - 0 (annual) - 0 (lifetime) = 15000000 * 0.4 = 6000000
      expect(result).toBe(6000000);
    });
  });
});