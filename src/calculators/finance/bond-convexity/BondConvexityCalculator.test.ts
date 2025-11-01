import { describe, it, expect } from 'vitest';
import {
  calculateConvexity,
  calculateDuration,
  calculateModifiedDuration,
  calculatePriceChange,
  calculatePercentagePriceChange
} from './formulas';
import { validateBondConvexityInputs } from './validation';

describe('Bond Convexity Calculator', () => {
  const mockInputs = {
    faceValue: 1000,
    couponRate: 5.0,
    yearsToMaturity: 10,
    yieldToMaturity: 5.0,
    couponFrequency: 2,
    currentPrice: 1000
  };

  describe('Core Calculations', () => {
    it('calculates convexity correctly', () => {
      const result = calculateConvexity(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeCloseTo(85, 0); // Approximate expected value
    });

    it('calculates duration correctly', () => {
      const result = calculateDuration(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(mockInputs.yearsToMaturity);
    });

    it('calculates modified duration correctly', () => {
      const result = calculateModifiedDuration(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(calculateDuration(mockInputs));
    });

    it('calculates price change correctly', () => {
      const result = calculatePriceChange(mockInputs);
      expect(typeof result).toBe('number');
      expect(isFinite(result)).toBe(true);
    });

    it('calculates percentage price change correctly', () => {
      const result = calculatePercentagePriceChange(mockInputs);
      expect(typeof result).toBe('number');
      expect(isFinite(result)).toBe(true);
      expect(result).toBeLessThan(0); // Price decreases with yield increase
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateBondConvexityInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates face value requirements', () => {
      const invalidInputs = { ...mockInputs, faceValue: 0 };
      const result = validateBondConvexityInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates coupon rate range', () => {
      const invalidInputs = { ...mockInputs, couponRate: -1 };
      const result = validateBondConvexityInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates years to maturity', () => {
      const invalidInputs = { ...mockInputs, yearsToMaturity: 0 };
      const result = validateBondConvexityInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates yield to maturity', () => {
      const invalidInputs = { ...mockInputs, yieldToMaturity: 0 };
      const result = validateBondConvexityInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates coupon frequency', () => {
      const invalidInputs = { ...mockInputs, couponFrequency: 3 };
      const result = validateBondConvexityInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero coupon bonds', () => {
      const zeroCouponInputs = { ...mockInputs, couponRate: 0 };
      const result = calculateConvexity(zeroCouponInputs);
      expect(result).toBeGreaterThan(0);
    });

    it('handles short maturity bonds', () => {
      const shortInputs = { ...mockInputs, yearsToMaturity: 0.5 };
      const result = calculateDuration(shortInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(1);
    });

    it('handles long maturity bonds', () => {
      const longInputs = { ...mockInputs, yearsToMaturity: 30 };
      const result = calculateDuration(longInputs);
      expect(result).toBeGreaterThan(0);
    });

    it('handles high yield bonds', () => {
      const highYieldInputs = { ...mockInputs, yieldToMaturity: 15 };
      const result = calculateConvexity(highYieldInputs);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Business Logic', () => {
    it('convexity increases with maturity', () => {
      const shortBond = calculateConvexity({ ...mockInputs, yearsToMaturity: 5 });
      const longBond = calculateConvexity({ ...mockInputs, yearsToMaturity: 15 });
      expect(longBond).toBeGreaterThan(shortBond);
    });

    it('duration increases with maturity', () => {
      const shortBond = calculateDuration({ ...mockInputs, yearsToMaturity: 5 });
      const longBond = calculateDuration({ ...mockInputs, yearsToMaturity: 15 });
      expect(longBond).toBeGreaterThan(shortBond);
    });

    it('higher coupon reduces duration', () => {
      const lowCoupon = calculateDuration({ ...mockInputs, couponRate: 2 });
      const highCoupon = calculateDuration({ ...mockInputs, couponRate: 8 });
      expect(lowCoupon).toBeGreaterThan(highCoupon);
    });

    it('price change magnitude increases with duration', () => {
      const shortBond = Math.abs(calculatePriceChange({ ...mockInputs, yearsToMaturity: 5 }));
      const longBond = Math.abs(calculatePriceChange({ ...mockInputs, yearsToMaturity: 15 }));
      expect(longBond).toBeGreaterThan(shortBond);
    });
  });
});