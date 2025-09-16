import { describe, it, expect } from 'vitest';
import { grantorRetainedAnnuityTrustCalculator } from './GrantorRetainedAnnuityTrustCalculator';
import { calculateGRAT, calculateGRATMetrics, validateGRATInputs } from './formulas';

describe('Grantor Retained Annuity Trust (GRAT) Calculator', () => {
  describe('calculateGRAT', () => {
    it('should calculate GRAT for standard trust', () => {
      const inputs = {
        initialValue: 1000000,
        annuityRate: 7.5,
        termYears: 5,
        growthRate: 8,
        discountRate: 6,
        gstTaxRate: 40,
        estateTaxRate: 40,
        includeStateTax: false,
        stateTaxRate: 5,
        inflationRate: 2.5,
        trustType: 'standard' as const
      };

      const result = calculateGRAT(inputs);

      expect(result.annuityPayment).toBe(75000);
      expect(result.remainderValue).toBeGreaterThan(1000000);
      expect(result.gstTaxLiability).toBeGreaterThan(0);
      expect(result.optimalStrategy).toBe('Standard GRAT structure');
    });

    it('should handle zeroed-out GRAT', () => {
      const inputs = {
        initialValue: 1000000,
        annuityRate: 2.1,
        termYears: 3,
        growthRate: 10,
        discountRate: 5,
        gstTaxRate: 40,
        estateTaxRate: 40,
        includeStateTax: true,
        stateTaxRate: 5,
        inflationRate: 2.5,
        trustType: 'zeroed-out' as const
      };

      const result = calculateGRAT(inputs);

      expect(result.annuityPayment).toBe(21000);
      expect(result.optimalStrategy).toBe('Zeroed-out GRAT for maximum transfer');
    });
  });

  describe('validateGRATInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        initialValue: 1000000,
        annuityRate: 7.5,
        termYears: 5,
        growthRate: 8,
        discountRate: 6,
        gstTaxRate: 40,
        estateTaxRate: 40,
        includeStateTax: false,
        stateTaxRate: 5,
        inflationRate: 2.5,
        trustType: 'standard' as const
      };

      const errors = validateGRATInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should validate negative initial value', () => {
      const inputs = {
        initialValue: -1000,
        annuityRate: 7.5,
        termYears: 5,
        growthRate: 8,
        discountRate: 6,
        gstTaxRate: 40,
        estateTaxRate: 40,
        includeStateTax: false,
        stateTaxRate: 5,
        inflationRate: 2.5,
        trustType: 'standard' as const
      };

      const errors = validateGRATInputs(inputs);
      expect(errors).toContain('Initial value must be greater than $0');
    });
  });

  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(grantorRetainedAnnuityTrustCalculator.id).toBe('grantor-retained-annuity-trust-grat-calculator');
      expect(grantorRetainedAnnuityTrustCalculator.title).toBe('Grantor Retained Annuity Trust (GRAT) Calculator');
      expect(grantorRetainedAnnuityTrustCalculator.category).toBe('finance');
      expect(grantorRetainedAnnuityTrustCalculator.subcategory).toBe('Retirement & Savings');
    });

    it('should have required inputs', () => {
      const requiredInputs = grantorRetainedAnnuityTrustCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(8);
    });

    it('should have expected outputs', () => {
      expect(grantorRetainedAnnuityTrustCalculator.outputs).toHaveLength(9);
      const outputIds = grantorRetainedAnnuityTrustCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('annuityPayment');
      expect(outputIds).toContain('netBenefit');
      expect(outputIds).toContain('optimalStrategy');
    });

    it('should have validation rules', () => {
      expect(grantorRetainedAnnuityTrustCalculator.validationRules).toHaveLength(13);
    });

    it('should have examples', () => {
      expect(grantorRetainedAnnuityTrustCalculator.examples).toHaveLength(2);
    });
  });
});