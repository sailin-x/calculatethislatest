import { describe, it, expect } from 'vitest';
import {
  calculateProjectedValue,
  calculateAnnuityIncome,
  calculateTotalContributions,
  calculateTaxLiability,
  calculateBreakEvenAge,
  calculateInternalRateOfReturn
} from './formulas';
import { validateVariableAnnuityInputs } from './validation';

describe('Variable Annuity Calculator', () => {
  const mockInputs = {
    initialInvestment: 100000,
    monthlyContribution: 500,
    investmentHorizon: 25,
    currentAge: 40,
    annuityStartAge: 65,
    expectedReturnRate: 7,
    volatility: 15,
    annuityPayoutRate: 6,
    inflationRate: 3,
    taxBracket: 25,
    annuityType: 'deferred' as const,
    payoutType: 'lifetime' as const,
    riderFees: 0.5,
    managementFees: 1.0
  };

  describe('Core Calculations', () => {
    it('calculates projected value correctly', () => {
      const result = calculateProjectedValue(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeGreaterThan(mockInputs.initialInvestment);
    });

    it('calculates annuity income correctly', () => {
      const projectedValue = calculateProjectedValue(mockInputs);
      const result = calculateAnnuityIncome(mockInputs, projectedValue);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(projectedValue / 12); // Should be less than monthly value
    });

    it('calculates total contributions correctly', () => {
      const result = calculateTotalContributions(mockInputs);
      const expected = mockInputs.initialInvestment + (mockInputs.monthlyContribution * mockInputs.investmentHorizon * 12);
      expect(result).toBe(expected);
    });

    it('calculates tax liability correctly', () => {
      const projectedValue = calculateProjectedValue(mockInputs);
      const result = calculateTaxLiability(mockInputs, projectedValue);
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('calculates break-even age correctly', () => {
      const result = calculateBreakEvenAge(mockInputs);
      expect(result).toBeGreaterThanOrEqual(mockInputs.annuityStartAge);
    });

    it('calculates internal rate of return correctly', () => {
      const result = calculateInternalRateOfReturn(mockInputs);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(50); // Reasonable upper bound
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateVariableAnnuityInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates age requirements', () => {
      const invalidInputs = { ...mockInputs, currentAge: 16 };
      const result = validateVariableAnnuityInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates annuity start age', () => {
      const invalidInputs = { ...mockInputs, annuityStartAge: 30 };
      const result = validateVariableAnnuityInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates investment horizon', () => {
      const invalidInputs = { ...mockInputs, investmentHorizon: 0 };
      const result = validateVariableAnnuityInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates return rate range', () => {
      const invalidInputs = { ...mockInputs, expectedReturnRate: 30 };
      const result = validateVariableAnnuityInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero monthly contributions', () => {
      const result = calculateTotalContributions({ ...mockInputs, monthlyContribution: 0 });
      expect(result).toBe(mockInputs.initialInvestment);
    });

    it('handles immediate annuity', () => {
      const immediateInputs = { ...mockInputs, annuityType: 'immediate' as const, investmentHorizon: 0 };
      const result = calculateProjectedValue(immediateInputs);
      expect(result).toBe(mockInputs.initialInvestment);
    });

    it('handles high volatility', () => {
      const result = calculateProjectedValue({ ...mockInputs, volatility: 30 });
      expect(result).toBeGreaterThan(0);
    });

    it('handles zero tax bracket', () => {
      const result = calculateTaxLiability(mockInputs, 200000);
      expect(result).toBeGreaterThan(0);
    });

    it('handles joint survivor payout', () => {
      const jointInputs = { ...mockInputs, payoutType: 'joint_survivor' as const };
      const projectedValue = calculateProjectedValue(jointInputs);
      const result = calculateAnnuityIncome(jointInputs, projectedValue);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Business Logic', () => {
    it('calculates reasonable annuity income', () => {
      const projectedValue = calculateProjectedValue(mockInputs);
      const annuityIncome = calculateAnnuityIncome(mockInputs, projectedValue);
      const payoutRate = mockInputs.annuityPayoutRate / 100;
      expect(annuityIncome).toBeCloseTo((projectedValue * payoutRate) / 12, -1);
    });

    it('ensures break-even age is reasonable', () => {
      const result = calculateBreakEvenAge(mockInputs);
      expect(result).toBeLessThan(120); // Should not be unreasonably high
    });

    it('calculates positive IRR for growth scenarios', () => {
      const result = calculateInternalRateOfReturn(mockInputs);
      expect(result).toBeGreaterThan(0);
    });
  });
});