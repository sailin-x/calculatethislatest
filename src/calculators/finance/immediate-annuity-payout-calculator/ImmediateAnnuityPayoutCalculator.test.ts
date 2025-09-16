import { describe, it, expect } from 'vitest';
import { immediateAnnuityPayoutCalculator } from './ImmediateAnnuityPayoutCalculator';
import { calculateImmediateAnnuity, calculateImmediateAnnuityMetrics, validateImmediateAnnuityInputs } from './formulas';

describe('Immediate Annuity Payout Calculator', () => {
  describe('calculateImmediateAnnuity', () => {
    it('should calculate single-life annuity payout', () => {
      const inputs = {
        principalAmount: 500000,
        age: 65,
        gender: 'male' as const,
        payoutType: 'single-life' as const,
        payoutFrequency: 'monthly' as const,
        annuityType: 'fixed' as const,
        guaranteePeriod: 10,
        inflationRate: 2.5,
        interestRate: 4,
        lifeExpectancy: 85
      };

      const result = calculateImmediateAnnuity(inputs);

      expect(result.monthlyPayout).toBeGreaterThan(0);
      expect(result.annualPayout).toBeGreaterThan(0);
      expect(result.totalPayments).toBeGreaterThan(0);
      expect(result.payoutDuration).toBeGreaterThan(0);
    });

    it('should calculate joint-life annuity with survivor benefit', () => {
      const inputs = {
        principalAmount: 500000,
        age: 65,
        gender: 'female' as const,
        payoutType: 'joint-life' as const,
        payoutFrequency: 'monthly' as const,
        annuityType: 'fixed' as const,
        guaranteePeriod: 10,
        jointAge: 62,
        jointGender: 'male' as const,
        inflationRate: 2.5,
        interestRate: 4,
        lifeExpectancy: 88
      };

      const result = calculateImmediateAnnuity(inputs);

      expect(result.survivorBenefit).toBeGreaterThan(0);
      expect(result.monthlyPayout).toBeGreaterThan(0);
    });
  });

  describe('validateImmediateAnnuityInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        principalAmount: 500000,
        age: 65,
        gender: 'male' as const,
        payoutType: 'single-life' as const,
        payoutFrequency: 'monthly' as const,
        annuityType: 'fixed' as const,
        guaranteePeriod: 10,
        inflationRate: 2.5,
        interestRate: 4,
        lifeExpectancy: 85
      };

      const errors = validateImmediateAnnuityInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should validate life expectancy greater than age', () => {
      const inputs = {
        principalAmount: 500000,
        age: 65,
        gender: 'male' as const,
        payoutType: 'single-life' as const,
        payoutFrequency: 'monthly' as const,
        annuityType: 'fixed' as const,
        guaranteePeriod: 10,
        inflationRate: 2.5,
        interestRate: 4,
        lifeExpectancy: 60
      };

      const errors = validateImmediateAnnuityInputs(inputs);
      expect(errors).toContain('Life expectancy must be greater than current age');
    });
  });

  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(immediateAnnuityPayoutCalculator.id).toBe('immediate-annuity-payout-calculator');
      expect(immediateAnnuityPayoutCalculator.title).toBe('Immediate Annuity Payout Calculator');
      expect(immediateAnnuityPayoutCalculator.category).toBe('finance');
      expect(immediateAnnuityPayoutCalculator.subcategory).toBe('Retirement & Savings');
    });

    it('should have required inputs', () => {
      const requiredInputs = immediateAnnuityPayoutCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(8);
    });

    it('should have expected outputs', () => {
      expect(immediateAnnuityPayoutCalculator.outputs).toHaveLength(9);
      const outputIds = immediateAnnuityPayoutCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('monthlyPayout');
      expect(outputIds).toContain('totalPayoutAmount');
      expect(outputIds).toContain('survivorBenefit');
    });

    it('should have validation rules', () => {
      expect(immediateAnnuityPayoutCalculator.validationRules).toHaveLength(13);
    });

    it('should have examples', () => {
      expect(immediateAnnuityPayoutCalculator.examples).toHaveLength(2);
    });
  });
});