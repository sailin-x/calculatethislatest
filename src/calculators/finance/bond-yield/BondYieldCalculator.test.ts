import { describe, it, expect } from 'vitest';
import {
  calculateYieldToMaturity,
  calculateCurrentYield,
  calculateTotalReturn,
  calculateMacaulayDuration,
  calculateModifiedDuration,
  calculateConvexity
} from './formulas';
import { validateBondYieldInputs } from './validation';

describe('Bond Yield Calculator', () => {
  const mockInputs = {
    faceValue: 1000,
    couponRate: 5.0,
    yearsToMaturity: 10,
    currentPrice: 1000,
    couponFrequency: 2
  };

  describe('Core Calculations', () => {
    it('calculates yield to maturity correctly', () => {
      const result = calculateYieldToMaturity(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeCloseTo(5.0, 1); // Should be close to coupon rate for par bond
    });

    it('calculates current yield correctly', () => {
      const result = calculateCurrentYield(mockInputs);
      expect(result).toBe(5.0); // Annual coupon / price = 50 / 1000 = 5%
    });

    it('calculates total return correctly', () => {
      const result = calculateTotalReturn(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(typeof result).toBe('number');
      expect(isFinite(result)).toBe(true);
    });

    it('calculates Macaulay duration correctly', () => {
      const result = calculateMacaulayDuration(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(mockInputs.yearsToMaturity);
    });

    it('calculates modified duration correctly', () => {
      const result = calculateModifiedDuration(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(calculateMacaulayDuration(mockInputs));
    });

    it('calculates convexity correctly', () => {
      const result = calculateConvexity(mockInputs);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateBondYieldInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates face value requirements', () => {
      const invalidInputs = { ...mockInputs, faceValue: 0 };
      const result = validateBondYieldInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates current price requirements', () => {
      const invalidInputs = { ...mockInputs, currentPrice: 0 };
      const result = validateBondYieldInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates coupon frequency', () => {
      const invalidInputs = { ...mockInputs, couponFrequency: 3 };
      const result = validateBondYieldInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates maturity years', () => {
      const invalidInputs = { ...mockInputs, yearsToMaturity: 0 };
      const result = validateBondYieldInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero coupon bonds', () => {
      const zeroCouponInputs = { ...mockInputs, couponRate: 0, currentPrice: 500 };
      const result = calculateYieldToMaturity(zeroCouponInputs);
      expect(result).toBeGreaterThan(0);
    });

    it('handles premium bonds', () => {
      const premiumInputs = { ...mockInputs, currentPrice: 1100 };
      const ytm = calculateYieldToMaturity(premiumInputs);
      const currentYield = calculateCurrentYield(premiumInputs);
      expect(ytm).toBeLessThan(currentYield);
    });

    it('handles discount bonds', () => {
      const discountInputs = { ...mockInputs, currentPrice: 900 };
      const ytm = calculateYieldToMaturity(discountInputs);
      const currentYield = calculateCurrentYield(discountInputs);
      expect(ytm).toBeGreaterThan(currentYield);
    });

    it('handles short maturity bonds', () => {
      const shortInputs = { ...mockInputs, yearsToMaturity: 0.5 };
      const result = calculateMacaulayDuration(shortInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(1);
    });

    it('handles long maturity bonds', () => {
      const longInputs = { ...mockInputs, yearsToMaturity: 30 };
      const result = calculateMacaulayDuration(longInputs);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Business Logic', () => {
    it('YTM equals coupon rate for par bonds', () => {
      const parBond = { ...mockInputs, currentPrice: 1000, couponRate: 5.0 };
      const ytm = calculateYieldToMaturity(parBond);
      expect(ytm).toBeCloseTo(5.0, 1);
    });

    it('duration decreases with higher coupon rates', () => {
      const lowCoupon = calculateMacaulayDuration({ ...mockInputs, couponRate: 2 });
      const highCoupon = calculateMacaulayDuration({ ...mockInputs, couponRate: 8 });
      expect(lowCoupon).toBeGreaterThan(highCoupon);
    });

    it('duration increases with maturity', () => {
      const shortBond = calculateMacaulayDuration({ ...mockInputs, yearsToMaturity: 5 });
      const longBond = calculateMacaulayDuration({ ...mockInputs, yearsToMaturity: 15 });
      expect(longBond).toBeGreaterThan(shortBond);
    });

    it('convexity increases with maturity', () => {
      const shortBond = calculateConvexity({ ...mockInputs, yearsToMaturity: 5 });
      const longBond = calculateConvexity({ ...mockInputs, yearsToMaturity: 15 });
      expect(longBond).toBeGreaterThan(shortBond);
    });

    it('modified duration is less than Macaulay duration', () => {
      const macaulay = calculateMacaulayDuration(mockInputs);
      const modified = calculateModifiedDuration(mockInputs);
      expect(modified).toBeLessThan(macaulay);
    });
  });
});