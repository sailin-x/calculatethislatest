import { describe, it, expect } from 'vitest';
import { irrevocableLifeInsuranceTrustILITValueCalculator } from './IrrevocableLifeInsuranceTrustILITValueCalculator';
import { calculateILIT, calculateILITMetrics, validateILITInputs } from './formulas';

describe('Irrevocable Life Insurance Trust (ILIT) Value Calculator', () => {
  describe('calculateILIT', () => {
    it('should calculate ILIT value for life insurance trust', () => {
      const inputs = {
        trustValue: 100000,
        annualPremium: 5000,
        deathBenefit: 1000000,
        trustDuration: 20,
        discountRate: 3,
        inflationRate: 2.5,
        taxRate: 40,
        administrativeCosts: 2000,
        numberOfBeneficiaries: 3,
        trustType: 'life-insurance' as const,
        includeCrummeyPowers: true,
        stateOfResidence: 'California'
      };

      const result = calculateILIT(inputs);

      expect(result.presentValue).toBeGreaterThan(0);
      expect(result.futureValue).toBeGreaterThan(0);
      expect(result.taxSavings).toBeGreaterThan(0);
      expect(result.netBenefit).toBeGreaterThan(0);
      expect(result.beneficiaryShare).toBeGreaterThan(0);
    });

    it('should calculate different tax savings for different trust types', () => {
      const baseInputs = {
        trustValue: 100000,
        annualPremium: 5000,
        deathBenefit: 1000000,
        trustDuration: 20,
        discountRate: 3,
        inflationRate: 2.5,
        taxRate: 40,
        administrativeCosts: 2000,
        numberOfBeneficiaries: 3,
        includeCrummeyPowers: true,
        stateOfResidence: 'California'
      };

      const lifeInsuranceResult = calculateILIT({ ...baseInputs, trustType: 'life-insurance' });
      const charitableResult = calculateILIT({ ...baseInputs, trustType: 'charitable-remainder' });
      const grantorResult = calculateILIT({ ...baseInputs, trustType: 'grantor' });

      expect(lifeInsuranceResult.taxSavings).toBeGreaterThan(grantorResult.taxSavings);
      expect(charitableResult.taxSavings).toBeGreaterThan(lifeInsuranceResult.taxSavings);
    });
  });

  describe('validateILITInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        trustValue: 100000,
        annualPremium: 5000,
        deathBenefit: 1000000,
        trustDuration: 20,
        discountRate: 3,
        inflationRate: 2.5,
        taxRate: 40,
        administrativeCosts: 2000,
        numberOfBeneficiaries: 3,
        trustType: 'life-insurance' as const,
        includeCrummeyPowers: true,
        stateOfResidence: 'California'
      };

      const errors = validateILITInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should validate negative trust value', () => {
      const inputs = {
        trustValue: -1000,
        annualPremium: 5000,
        deathBenefit: 1000000,
        trustDuration: 20,
        discountRate: 3,
        inflationRate: 2.5,
        taxRate: 40,
        administrativeCosts: 2000,
        numberOfBeneficiaries: 3,
        trustType: 'life-insurance' as const,
        includeCrummeyPowers: true,
        stateOfResidence: 'California'
      };

      const errors = validateILITInputs(inputs);
      expect(errors).toContain('Trust value cannot be negative');
    });
  });

  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(irrevocableLifeInsuranceTrustILITValueCalculator.id).toBe('irrevocable-life-insurance-trust-ilit-value-calculator');
      expect(irrevocableLifeInsuranceTrustILITValueCalculator.title).toBe('Irrevocable Life Insurance Trust (ILIT) Value Calculator');
      expect(irrevocableLifeInsuranceTrustILITValueCalculator.category).toBe('finance');
      expect(irrevocableLifeInsuranceTrustILITValueCalculator.subcategory).toBe('Retirement & Savings');
    });

    it('should have required inputs', () => {
      const requiredInputs = irrevocableLifeInsuranceTrustILITValueCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(9);
    });

    it('should have expected outputs', () => {
      expect(irrevocableLifeInsuranceTrustILITValueCalculator.outputs).toHaveLength(9);
      const outputIds = irrevocableLifeInsuranceTrustILITValueCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('presentValue');
      expect(outputIds).toContain('taxSavings');
      expect(outputIds).toContain('netBenefit');
    });

    it('should have validation rules', () => {
      expect(irrevocableLifeInsuranceTrustILITValueCalculator.validationRules).toHaveLength(16);
    });

    it('should have examples', () => {
      expect(irrevocableLifeInsuranceTrustILITValueCalculator.examples).toHaveLength(2);
    });
  });
});