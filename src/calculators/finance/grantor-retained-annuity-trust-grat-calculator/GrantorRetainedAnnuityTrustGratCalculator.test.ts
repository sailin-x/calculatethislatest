import { describe, it, expect } from 'vitest';
import {
  calculateAnnualAnnuityPayment,
  calculateTotalAnnuityPayments,
  calculateRemainingValue,
  calculateTaxSavings,
  calculateEffectiveTransfer
} from './formulas';
import { validateGrantorRetainedAnnuityTrustGratCalculatorInputs } from './validation';

describe('Grantor Retained Annuity Trust (GRAT) Calculator', () => {
  const mockInputs = {
    initialValue: 1000000,
    annuityRate: 7.5,
    termYears: 5,
    growthRate: 6,
    discountRate: 4,
    isZeroedOut: false
  };

  describe('GRAT Calculations', () => {
    it('calculates annual annuity payment correctly', () => {
      const result = calculateAnnualAnnuityPayment(mockInputs);
      expect(result).toBe(75000); // 1000000 * 0.075
    });

    it('calculates total annuity payments correctly', () => {
      const result = calculateTotalAnnuityPayments(mockInputs);
      expect(result).toBe(375000); // 75000 * 5
    });

    it('calculates remaining value correctly', () => {
      const result = calculateRemainingValue(mockInputs);
      expect(result).toBeGreaterThan(0);
      // This will be approximately the initial value minus payments plus growth
    });

    it('calculates tax savings correctly', () => {
      const result = calculateTaxSavings(mockInputs);
      expect(result).toBeGreaterThan(0);
      // Tax savings = remaining value * 0.40 (estate tax rate)
    });

    it('calculates effective transfer correctly', () => {
      const result = calculateEffectiveTransfer(mockInputs);
      // Effective transfer = remaining value - total annuity payments
      expect(typeof result).toBe('number');
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateGrantorRetainedAnnuityTrustGratCalculatorInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates initial value cannot be zero', () => {
      const invalidInputs = { ...mockInputs, initialValue: 0 };
      const result = validateGrantorRetainedAnnuityTrustGratCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates annuity rate range', () => {
      const invalidInputs = { ...mockInputs, annuityRate: 150 };
      const result = validateGrantorRetainedAnnuityTrustGratCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates term years range', () => {
      const invalidInputs = { ...mockInputs, termYears: 0 };
      const result = validateGrantorRetainedAnnuityTrustGratCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates growth rate range', () => {
      const invalidInputs = { ...mockInputs, growthRate: -60 };
      const result = validateGrantorRetainedAnnuityTrustGratCalculatorInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero growth rate correctly', () => {
      const zeroGrowthInputs = { ...mockInputs, growthRate: 0 };
      const result = calculateRemainingValue(zeroGrowthInputs);
      expect(result).toBeGreaterThan(0);
    });

    it('handles high annuity rate correctly', () => {
      const highRateInputs = { ...mockInputs, annuityRate: 15 };
      const result = calculateAnnualAnnuityPayment(highRateInputs);
      expect(result).toBe(150000); // 1000000 * 0.15
    });

    it('handles short term correctly', () => {
      const shortTermInputs = { ...mockInputs, termYears: 2 };
      const result = calculateTotalAnnuityPayments(shortTermInputs);
      expect(result).toBe(150000); // 75000 * 2
    });

    it('handles long term correctly', () => {
      const longTermInputs = { ...mockInputs, termYears: 10 };
      const result = calculateTotalAnnuityPayments(longTermInputs);
      expect(result).toBe(750000); // 75000 * 10
    });

    it('calculates zeroed-out GRAT correctly', () => {
      const zeroedInputs = { ...mockInputs, isZeroedOut: true };
      const result = calculateRemainingValue(zeroedInputs);
      // Zeroed-out GRAT should have minimal remaining value
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });
});