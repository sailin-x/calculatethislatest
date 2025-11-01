import { describe, it, expect } from 'vitest';
import {
  calculateMonthlyDistribution,
  calculateAnnualDistribution,
  calculateTaxLiability,
  calculateTrustFundDistribution
} from './formulas';
import { validateTrustFundDistributionInputs } from './validation';

describe('Trust Fund Distribution Calculator', () => {
  const mockInputs = {
    trustPrincipal: 500000,
    annualIncome: 25000,
    beneficiaryAge: 25,
    trustDuration: 20,
    distributionFrequency: 'quarterly' as const,
    inflationRate: 3,
    taxRate: 25,
    trustType: 'irrevocable' as const,
    stateOfResidence: 'CA',
    numberOfBeneficiaries: 2,
    investmentReturn: 6,
    administrativeCosts: 1.5,
    requiredMinimumDistribution: false,
    generationSkipping: false
  };

  describe('Distribution Calculations', () => {
    it('calculates monthly distribution correctly', () => {
      const result = calculateMonthlyDistribution(500000, 25000, 20, 'quarterly');
      expect(result).toBeGreaterThan(0);
      expect(result).toBeCloseTo(3125, 0); // (500000 + 25000 * 20) / (20 * 4)
    });

    it('calculates annual distribution correctly', () => {
      const result = calculateAnnualDistribution(500000, 25000, 20);
      expect(result).toBe(25000); // (500000 + 25000 * 20) / 20
    });

    it('calculates tax liability correctly', () => {
      const totalDistributions = 500000 + (25000 * 20);
      const result = calculateTaxLiability(totalDistributions, 25, 'irrevocable');
      expect(result).toBe(totalDistributions * 0.20); // 25% * 0.8 for irrevocable
    });
  });

  describe('Complete Trust Analysis', () => {
    it('calculates full trust distribution scenario', () => {
      const result = calculateTrustFundDistribution(mockInputs);
      expect(result.monthlyDistribution).toBeGreaterThan(0);
      expect(result.annualDistribution).toBeGreaterThan(0);
      expect(result.totalDistributions).toBeGreaterThan(0);
      expect(result.taxLiability).toBeGreaterThan(0);
      expect(result.netDistribution).toBeGreaterThan(0);
      expect(result.distributionSchedule).toBeDefined();
      expect(result.taxEfficiency).toBeGreaterThan(0);
    });

    it('handles zero annual income', () => {
      const zeroIncomeInputs = { ...mockInputs, annualIncome: 0 };
      const result = calculateTrustFundDistribution(zeroIncomeInputs);
      expect(result.annualDistribution).toBe(25000); // Only principal distribution
    });

    it('handles charitable trust tax benefits', () => {
      const charitableInputs = { ...mockInputs, trustType: 'charitable' as const };
      const result = calculateTrustFundDistribution(charitableInputs);
      expect(result.taxLiability).toBe(0); // Charitable trusts have different tax treatment
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validateTrustFundDistributionInputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates trust principal cannot be zero', () => {
      const invalidInputs = { ...mockInputs, trustPrincipal: 0 };
      const result = validateTrustFundDistributionInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates beneficiary age range', () => {
      const invalidInputs = { ...mockInputs, beneficiaryAge: -5 };
      const result = validateTrustFundDistributionInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates trust duration', () => {
      const invalidInputs = { ...mockInputs, trustDuration: 0 };
      const result = validateTrustFundDistributionInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates tax rate range', () => {
      const invalidInputs = { ...mockInputs, taxRate: 60 };
      const result = validateTrustFundDistributionInputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles very long trust duration', () => {
      const longDurationInputs = { ...mockInputs, trustDuration: 50 };
      const result = calculateTrustFundDistribution(longDurationInputs);
      expect(result.trustDurationYears).toBe(50);
    });

    it('handles single beneficiary', () => {
      const singleBeneficiaryInputs = { ...mockInputs, numberOfBeneficiaries: 1 };
      const result = calculateTrustFundDistribution(singleBeneficiaryInputs);
      expect(result.beneficiaryIncome).toBeGreaterThan(0);
    });

    it('handles monthly distributions', () => {
      const monthlyInputs = { ...mockInputs, distributionFrequency: 'monthly' as const };
      const result = calculateTrustFundDistribution(monthlyInputs);
      expect(result.distributionSchedule[0]).toContain('12 x');
    });

    it('handles high administrative costs', () => {
      const highCostInputs = { ...mockInputs, administrativeCosts: 5 };
      const result = calculateTrustFundDistribution(highCostInputs);
      expect(result.administrativeCostPercentage).toBe(5);
    });

    it('handles zero tax rate', () => {
      const zeroTaxInputs = { ...mockInputs, taxRate: 0 };
      const result = calculateTrustFundDistribution(zeroTaxInputs);
      expect(result.taxLiability).toBe(0);
    });
  });

  describe('Trust Types', () => {
    it('handles revocable trust', () => {
      const revocableInputs = { ...mockInputs, trustType: 'revocable' as const };
      const result = calculateTrustFundDistribution(revocableInputs);
      expect(result).toBeDefined();
    });

    it('handles special needs trust', () => {
      const specialNeedsInputs = { ...mockInputs, trustType: 'special_needs' as const };
      const result = calculateTrustFundDistribution(specialNeedsInputs);
      expect(result).toBeDefined();
    });

    it('calculates different tax treatments', () => {
      const irrevocableResult = calculateTrustFundDistribution(mockInputs);
      const charitableResult = calculateTrustFundDistribution({
        ...mockInputs,
        trustType: 'charitable' as const
      });
      expect(irrevocableResult.taxLiability).toBeGreaterThan(charitableResult.taxLiability);
    });
  });
});