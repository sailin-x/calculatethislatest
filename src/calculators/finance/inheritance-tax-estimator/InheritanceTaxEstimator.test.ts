import { describe, it, expect } from 'vitest';
import { inheritanceTaxEstimator } from './InheritanceTaxEstimator';
import { calculateInheritanceTax, calculateInheritanceTaxMetrics, validateInheritanceTaxInputs } from './formulas';

describe('Inheritance Tax Estimator', () => {
  describe('calculateInheritanceTax', () => {
    it('should calculate inheritance tax for estate under exemption', () => {
      const inputs = {
        estateValue: 5000000,
        maritalStatus: 'married' as const,
        numberOfChildren: 2,
        stateOfResidence: 'California',
        hasWill: true,
        hasTrust: true,
        charitableDonations: 100000,
        funeralExpenses: 15000,
        medicalExpenses: 50000,
        administrativeExpenses: 25000,
        debtsAndLiabilities: 50000,
        lifeInsuranceProceeds: false,
        retirementAccounts: 500000,
        realEstateValue: 1000000,
        businessInterests: 2000000,
        personalProperty: 200000,
        cashAndInvestments: 800000
      };

      const result = calculateInheritanceTax(inputs);

      expect(result.grossEstateValue).toBe(5000000);
      expect(result.totalDeductions).toBe(240000);
      expect(result.taxableEstate).toBe(4760000);
      expect(result.federalEstateTax).toBe(0);
      expect(result.stateEstateTax).toBe(0);
      expect(result.totalEstateTax).toBe(0);
      expect(result.netEstateValue).toBe(5000000);
    });

    it('should calculate inheritance tax for estate over exemption', () => {
      const inputs = {
        estateValue: 20000000,
        maritalStatus: 'single' as const,
        numberOfChildren: 1,
        stateOfResidence: 'New York',
        hasWill: true,
        hasTrust: false,
        charitableDonations: 200000,
        funeralExpenses: 20000,
        medicalExpenses: 100000,
        administrativeExpenses: 50000,
        debtsAndLiabilities: 100000,
        lifeInsuranceProceeds: true,
        retirementAccounts: 1000000,
        realEstateValue: 5000000,
        businessInterests: 8000000,
        personalProperty: 500000,
        cashAndInvestments: 2000000
      };

      const result = calculateInheritanceTax(inputs);

      expect(result.grossEstateValue).toBe(20000000);
      expect(result.totalDeductions).toBe(470000);
      expect(result.taxableEstate).toBe(19530000);
      expect(result.federalEstateTax).toBeGreaterThan(0);
      expect(result.stateEstateTax).toBeGreaterThan(0);
      expect(result.totalEstateTax).toBeGreaterThan(0);
      expect(result.netEstateValue).toBeLessThan(20000000);
    });
  });

  describe('validateInheritanceTaxInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        estateValue: 5000000,
        maritalStatus: 'married' as const,
        numberOfChildren: 2,
        stateOfResidence: 'California',
        hasWill: true,
        hasTrust: true,
        charitableDonations: 100000,
        funeralExpenses: 15000,
        medicalExpenses: 50000,
        administrativeExpenses: 25000,
        debtsAndLiabilities: 50000,
        lifeInsuranceProceeds: false,
        retirementAccounts: 500000,
        realEstateValue: 1000000,
        businessInterests: 2000000,
        personalProperty: 200000,
        cashAndInvestments: 800000
      };

      const errors = validateInheritanceTaxInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should validate negative estate value', () => {
      const inputs = {
        estateValue: -1000000,
        maritalStatus: 'married' as const,
        numberOfChildren: 2,
        stateOfResidence: 'California',
        hasWill: true,
        hasTrust: true,
        charitableDonations: 100000,
        funeralExpenses: 15000,
        medicalExpenses: 50000,
        administrativeExpenses: 25000,
        debtsAndLiabilities: 50000,
        lifeInsuranceProceeds: false,
        retirementAccounts: 500000,
        realEstateValue: 1000000,
        businessInterests: 2000000,
        personalProperty: 200000,
        cashAndInvestments: 800000
      };

      const errors = validateInheritanceTaxInputs(inputs);
      expect(errors).toContain('Estate value must be greater than $0');
    });
  });

  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(inheritanceTaxEstimator.id).toBe('inheritance-tax-estimator');
      expect(inheritanceTaxEstimator.title).toBe('Inheritance Tax Estimator');
      expect(inheritanceTaxEstimator.category).toBe('finance');
      expect(inheritanceTaxEstimator.subcategory).toBe('Retirement & Savings');
    });

    it('should have required inputs', () => {
      const requiredInputs = inheritanceTaxEstimator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(4);
    });

    it('should have expected outputs', () => {
      expect(inheritanceTaxEstimator.outputs).toHaveLength(11);
      const outputIds = inheritanceTaxEstimator.outputs.map(output => output.id);
      expect(outputIds).toContain('grossEstateValue');
      expect(outputIds).toContain('totalEstateTax');
      expect(outputIds).toContain('finalDistribution');
    });

    it('should have validation rules', () => {
      expect(inheritanceTaxEstimator.validationRules).toHaveLength(16);
    });

    it('should have examples', () => {
      expect(inheritanceTaxEstimator.examples).toHaveLength(2);
    });
  });
});