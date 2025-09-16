import { describe, it, expect } from 'vitest';
import { requiredMinimumDistributionRMDCalculator } from './RequiredMinimumDistributionRMDCalculator';
import { calculateRMDRMD, calculateRMDRMDMetrics, validateRMDRMDInputs } from './formulas';

describe('Required Minimum Distribution (RMD) Calculator', () => {
  describe('calculateRMDRMD', () => {
    it('should calculate RMD for traditional IRA', () => {
      const inputs = {
        accountBalance: 750000,
        currentAge: 72,
        lifeExpectancy: 87,
        accountType: 'traditional_ira' as const,
        beneficiaryType: 'non_spouse' as const,
        includeSpouse: false,
        spouseAge: 70,
        taxBracket: 28,
        expectedReturn: 6,
        inflationRate: 2.5,
        previousYearBalance: 700000,
        qualifiedCharitableDistribution: 0
      };

      const result = calculateRMDRMD(inputs);

      expect(result.annualRMD).toBeGreaterThan(0);
      expect(result.monthlyRMD).toBeGreaterThan(0);
      expect(result.quarterlyRMD).toBeGreaterThan(0);
      expect(result.remainingLifeExpectancy).toBe(15);
      expect(typeof result.rmdStrategy).toBe('string');
    });

    it('should calculate no RMDs for Roth IRA', () => {
      const inputs = {
        accountBalance: 600000,
        currentAge: 75,
        lifeExpectancy: 88,
        accountType: 'roth_ira' as const,
        beneficiaryType: 'spouse' as const,
        includeSpouse: true,
        spouseAge: 72,
        taxBracket: 25,
        expectedReturn: 7,
        inflationRate: 2.5,
        previousYearBalance: 550000,
        qualifiedCharitableDistribution: 0
      };

      const result = calculateRMDRMD(inputs);

      expect(result.annualRMD).toBe(0);
      expect(result.monthlyRMD).toBe(0);
      expect(result.quarterlyRMD).toBe(0);
      expect(result.taxOnRMD).toBe(0);
      expect(result.netRMD).toBe(0);
    });

    it('should account for qualified charitable distributions', () => {
      const inputs = {
        accountBalance: 750000,
        currentAge: 72,
        lifeExpectancy: 87,
        accountType: 'traditional_ira' as const,
        beneficiaryType: 'non_spouse' as const,
        includeSpouse: false,
        spouseAge: 70,
        taxBracket: 28,
        expectedReturn: 6,
        inflationRate: 2.5,
        previousYearBalance: 700000,
        qualifiedCharitableDistribution: 100000
      };

      const result = calculateRMDRMD(inputs);

      expect(result.totalRMDRequired).toBe(Math.max(0, result.annualRMD - 100000));
    });
  });

  describe('validateRMDRMDInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        accountBalance: 750000,
        currentAge: 72,
        lifeExpectancy: 87,
        accountType: 'traditional_ira' as const,
        beneficiaryType: 'non_spouse' as const,
        includeSpouse: false,
        spouseAge: 70,
        taxBracket: 28,
        expectedReturn: 6,
        inflationRate: 2.5,
        previousYearBalance: 700000,
        qualifiedCharitableDistribution: 0
      };

      const errors = validateRMDRMDInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should validate life expectancy greater than current age', () => {
      const inputs = {
        accountBalance: 750000,
        currentAge: 80,
        lifeExpectancy: 75,
        accountType: 'traditional_ira' as const,
        beneficiaryType: 'non_spouse' as const,
        includeSpouse: false,
        spouseAge: 70,
        taxBracket: 28,
        expectedReturn: 6,
        inflationRate: 2.5,
        previousYearBalance: 700000,
        qualifiedCharitableDistribution: 0
      };

      const errors = validateRMDRMDInputs(inputs);
      expect(errors).toContain('Life expectancy must be greater than current age');
    });
  });

  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(requiredMinimumDistributionRMDCalculator.id).toBe('required-minimum-distribution-rmd-calculator');
      expect(requiredMinimumDistributionRMDCalculator.title).toBe('Required Minimum Distribution (RMD) Calculator');
      expect(requiredMinimumDistributionRMDCalculator.category).toBe('finance');
      expect(requiredMinimumDistributionRMDCalculator.subcategory).toBe('Retirement & Savings');
    });

    it('should have required inputs', () => {
      const requiredInputs = requiredMinimumDistributionRMDCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(7);
    });

    it('should have expected outputs', () => {
      expect(requiredMinimumDistributionRMDCalculator.outputs).toHaveLength(10);
      const outputIds = requiredMinimumDistributionRMDCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('annualRMD');
      expect(outputIds).toContain('monthlyRMD');
      expect(outputIds).toContain('rmdStrategy');
    });

    it('should have validation rules', () => {
      expect(requiredMinimumDistributionRMDCalculator.validationRules).toHaveLength(16);
    });

    it('should have examples', () => {
      expect(requiredMinimumDistributionRMDCalculator.examples).toHaveLength(2);
    });
  });
});