import { describe, it, expect } from 'vitest';
import { pensionLumpSumVsAnnuityCalculator } from './PensionLumpSumVsAnnuityCalculator';
import { calculatePensionComparison, calculatePensionMetrics, validatePensionInputs } from './formulas';

describe('Pension Lump Sum vs. Annuity Calculator', () => {
  describe('calculatePensionComparison', () => {
    it('should calculate pension comparison for lump sum vs annuity', () => {
      const inputs = {
        lumpSumAmount: 500000,
        annualAnnuityPayment: 25000,
        currentAge: 65,
        lifeExpectancy: 85,
        expectedReturn: 6,
        inflationRate: 2.5,
        taxBracket: 25,
        annuityType: 'fixed' as const,
        includeSpouse: false,
        spouseAge: 62,
        spouseLifeExpectancy: 82,
        riskTolerance: 'medium' as const
      };

      const result = calculatePensionComparison(inputs);

      expect(result.lumpSumPresentValue).toBeGreaterThan(0);
      expect(result.annuityPresentValue).toBeGreaterThan(0);
      expect(result.lumpSumMonthlyIncome).toBeGreaterThan(0);
      expect(result.annuityMonthlyIncome).toBeGreaterThan(0);
      expect(typeof result.recommendedChoice).toBe('string');
    });

    it('should calculate different results for different annuity types', () => {
      const baseInputs = {
        lumpSumAmount: 400000,
        annualAnnuityPayment: 20000,
        currentAge: 60,
        lifeExpectancy: 80,
        expectedReturn: 7,
        inflationRate: 2.5,
        taxBracket: 28,
        includeSpouse: false,
        spouseAge: 58,
        spouseLifeExpectancy: 78,
        riskTolerance: 'medium' as const
      };

      const fixedResult = calculatePensionComparison({ ...baseInputs, annuityType: 'fixed' });
      const inflationAdjustedResult = calculatePensionComparison({ ...baseInputs, annuityType: 'inflation_adjusted' });

      expect(fixedResult.annuityPresentValue).toBeGreaterThan(0);
      expect(inflationAdjustedResult.annuityPresentValue).toBeGreaterThan(0);
    });
  });

  describe('validatePensionInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        lumpSumAmount: 500000,
        annualAnnuityPayment: 25000,
        currentAge: 65,
        lifeExpectancy: 85,
        expectedReturn: 6,
        inflationRate: 2.5,
        taxBracket: 25,
        annuityType: 'fixed' as const,
        includeSpouse: false,
        spouseAge: 62,
        spouseLifeExpectancy: 82,
        riskTolerance: 'medium' as const
      };

      const errors = validatePensionInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should validate life expectancy greater than current age', () => {
      const inputs = {
        lumpSumAmount: 500000,
        annualAnnuityPayment: 25000,
        currentAge: 80,
        lifeExpectancy: 75,
        expectedReturn: 6,
        inflationRate: 2.5,
        taxBracket: 25,
        annuityType: 'fixed' as const,
        includeSpouse: false,
        spouseAge: 62,
        spouseLifeExpectancy: 82,
        riskTolerance: 'medium' as const
      };

      const errors = validatePensionInputs(inputs);
      expect(errors).toContain('Life expectancy must be greater than current age');
    });
  });

  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(pensionLumpSumVsAnnuityCalculator.id).toBe('pension-lump-sum-vs-annuity-calculator');
      expect(pensionLumpSumVsAnnuityCalculator.title).toBe('Pension Lump Sum vs. Annuity Calculator');
      expect(pensionLumpSumVsAnnuityCalculator.category).toBe('finance');
      expect(pensionLumpSumVsAnnuityCalculator.subcategory).toBe('Retirement & Savings');
    });

    it('should have required inputs', () => {
      const requiredInputs = pensionLumpSumVsAnnuityCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(8);
    });

    it('should have expected outputs', () => {
      expect(pensionLumpSumVsAnnuityCalculator.outputs).toHaveLength(8);
      const outputIds = pensionLumpSumVsAnnuityCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('lumpSumPresentValue');
      expect(outputIds).toContain('annuityPresentValue');
      expect(outputIds).toContain('recommendedChoice');
    });

    it('should have validation rules', () => {
      expect(pensionLumpSumVsAnnuityCalculator.validationRules).toHaveLength(16);
    });

    it('should have examples', () => {
      expect(pensionLumpSumVsAnnuityCalculator.examples).toHaveLength(2);
    });
  });
});