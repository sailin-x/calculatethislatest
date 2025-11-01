import { describe, it, expect } from 'vitest';
import {
  calculateSettlementValue,
  calculateNetSettlementAmount,
  calculateViaticalDiscount,
  calculateMonthlyPremiumSavings,
  calculateBreakEvenPeriod,
  calculateNetBenefit
} from './formulas';
import { validateViaticalSettlementInputs } from './validation';

describe('Viatical Settlement Value Calculator', () => {
  const mockInputs = {
    faceValue: 500000,
    currentAge: 65,
    lifeExpectancy: 12,
    healthCondition: 'terminal' as const,
    policyType: 'whole_life' as const,
    premiumAmount: 8500,
    premiumFrequency: 'annually' as const,
    yearsOwned: 15,
    discountRate: 8,
    settlementFees: 15000,
    state: 'CA',
    taxBracket: 25
  };

  describe('Core Calculations', () => {
    it('calculates settlement value correctly', () => {
      const result = calculateSettlementValue(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(mockInputs.faceValue);
    });

    it('calculates net settlement amount correctly', () => {
      const settlementValue = calculateSettlementValue(mockInputs);
      const result = calculateNetSettlementAmount(mockInputs, settlementValue);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(settlementValue);
    });

    it('calculates viatical discount correctly', () => {
      const result = calculateViaticalDiscount(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(1);
    });

    it('calculates monthly premium savings correctly', () => {
      const result = calculateMonthlyPremiumSavings(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBe(mockInputs.premiumAmount / 12);
    });

    it('calculates break-even period correctly', () => {
      const result = calculateBreakEvenPeriod(mockInputs);
      expect(result).toBeGreaterThan(0);
    });

    it('calculates net benefit correctly', () => {
      const result = calculateNetBenefit(mockInputs);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateViaticalSettlementInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates face value requirements', () => {
      const invalidInputs = { ...mockInputs, faceValue: 0 };
      const result = validateViaticalSettlementInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates life expectancy range', () => {
      const invalidInputs = { ...mockInputs, lifeExpectancy: 0 };
      const result = validateViaticalSettlementInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates health condition', () => {
      const invalidInputs = { ...mockInputs, healthCondition: 'healthy' as any };
      const result = validateViaticalSettlementInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates premium amount', () => {
      const invalidInputs = { ...mockInputs, premiumAmount: -100 };
      const result = validateViaticalSettlementInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles terminal condition with short life expectancy', () => {
      const terminalInputs = { ...mockInputs, lifeExpectancy: 3, healthCondition: 'terminal' as const };
      const result = calculateSettlementValue(terminalInputs);
      expect(result).toBeGreaterThan(0.8 * mockInputs.faceValue);
    });

    it('handles long life expectancy', () => {
      const longInputs = { ...mockInputs, lifeExpectancy: 120 };
      const result = calculateSettlementValue(longInputs);
      expect(result).toBeLessThan(0.6 * mockInputs.faceValue);
    });

    it('handles zero settlement fees', () => {
      const noFeeInputs = { ...mockInputs, settlementFees: 0 };
      const settlementValue = calculateSettlementValue(noFeeInputs);
      const result = calculateNetSettlementAmount(noFeeInputs, settlementValue);
      expect(result).toBe(settlementValue - (settlementValue * 0.03)); // State fee only
    });

    it('handles different policy types', () => {
      const termInputs = { ...mockInputs, policyType: 'term' as const };
      const wholeInputs = { ...mockInputs, policyType: 'whole_life' as const };
      const termResult = calculateSettlementValue(termInputs);
      const wholeResult = calculateSettlementValue(wholeInputs);
      expect(termResult).toBeLessThan(wholeResult);
    });
  });

  describe('Business Logic', () => {
    it('terminal condition yields highest settlement value', () => {
      const terminalResult = calculateSettlementValue(mockInputs);
      const criticalResult = calculateSettlementValue({ ...mockInputs, healthCondition: 'critical' as const });
      const seriousResult = calculateSettlementValue({ ...mockInputs, healthCondition: 'serious' as const });
      expect(terminalResult).toBeGreaterThan(criticalResult);
      expect(criticalResult).toBeGreaterThan(seriousResult);
    });

    it('shorter life expectancy yields higher settlement value', () => {
      const shortResult = calculateSettlementValue({ ...mockInputs, lifeExpectancy: 6 });
      const longResult = calculateSettlementValue({ ...mockInputs, lifeExpectancy: 24 });
      expect(shortResult).toBeGreaterThan(longResult);
    });

    it('older policies have higher settlement values', () => {
      const oldResult = calculateSettlementValue({ ...mockInputs, yearsOwned: 20 });
      const newResult = calculateSettlementValue({ ...mockInputs, yearsOwned: 2 });
      expect(oldResult).toBeGreaterThan(newResult);
    });
  });
});