import { describe, it, expect } from 'vitest';
import {
  calculateFutureValue,
  calculateTotalContributions,
  calculateTaxLiability,
  calculateCustodialAccountValue,
  calculateAnnualTaxSavings
} from './formulas';
import { validateUGMACustodialAccountInputs } from './validation';

describe('UGMA/UTMA Custodial Account Calculator', () => {
  const mockInputs = {
    initialContribution: 5000,
    annualContribution: 15000,
    contributionFrequency: 'annually' as const,
    expectedReturnRate: 7,
    inflationRate: 3,
    childAge: 2,
    custodialAccountType: 'UGMA' as const,
    state: 'CA',
    taxYear: 2024,
    giftTaxExclusionUsed: 0
  };

  describe('Core Calculations', () => {
    it('calculates future value correctly', () => {
      const result = calculateFutureValue(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeCloseTo(1200000, -2); // Approximate expected value
    });

    it('calculates total contributions correctly', () => {
      const result = calculateTotalContributions(mockInputs);
      const expected = mockInputs.initialContribution + (mockInputs.annualContribution * 16); // 18 - 2 = 16 years
      expect(result).toBe(expected);
    });

    it('calculates tax liability correctly', () => {
      const futureValue = calculateFutureValue(mockInputs);
      const result = calculateTaxLiability(mockInputs, futureValue);
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('calculates custodial account value correctly', () => {
      const result = calculateCustodialAccountValue(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(calculateFutureValue(mockInputs));
    });

    it('calculates annual tax savings correctly', () => {
      const result = calculateAnnualTaxSavings(mockInputs);
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateUGMACustodialAccountInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates child age limits', () => {
      const invalidInputs = { ...mockInputs, childAge: 20 };
      const result = validateUGMACustodialAccountInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates annual contribution limits', () => {
      const invalidInputs = { ...mockInputs, annualContribution: 20000 };
      const result = validateUGMACustodialAccountInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates return rate range', () => {
      const invalidInputs = { ...mockInputs, expectedReturnRate: 30 };
      const result = validateUGMACustodialAccountInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero initial contribution', () => {
      const result = calculateFutureValue({ ...mockInputs, initialContribution: 0 });
      expect(result).toBeGreaterThan(0);
    });

    it('handles zero annual contribution', () => {
      const result = calculateFutureValue({ ...mockInputs, annualContribution: 0 });
      expect(result).toBe(mockInputs.initialContribution);
    });

    it('handles child at transfer age', () => {
      const result = calculateFutureValue({ ...mockInputs, childAge: 18 });
      expect(result).toBe(mockInputs.initialContribution);
    });

    it('handles different custodial account types', () => {
      const ugmaResult = calculateFutureValue(mockInputs);
      const utmaResult = calculateFutureValue({ ...mockInputs, custodialAccountType: 'UTMA' as const });
      expect(ugmaResult).toBe(utmaResult); // Same calculation, different transfer age
    });
  });

  describe('Tax Calculations', () => {
    it('calculates gift tax impact when exceeding exclusion', () => {
      const inputs = { ...mockInputs, annualContribution: 20000, giftTaxExclusionUsed: 5000 };
      const result = calculateFutureValue(inputs);
      expect(result).toBeGreaterThan(0);
    });

    it('handles no capital gains tax', () => {
      const inputs = { ...mockInputs, initialContribution: 100000, annualContribution: 0 };
      const futureValue = calculateFutureValue(inputs);
      const taxLiability = calculateTaxLiability(inputs, futureValue);
      expect(taxLiability).toBe(0);
    });
  });
});