import { describe, it, expect } from 'vitest';
import { hsaTripleTaxAdvantageCalculator } from './HSATripleTaxAdvantageCalculator';
import { calculateHSATripleTax, calculateHSATripleTaxMetrics, validateHSATripleTaxInputs } from './formulas';

describe('HSA Triple Tax Advantage Calculator', () => {
  describe('calculateHSATripleTax', () => {
    it('should calculate HSA triple tax advantages', () => {
      const inputs = {
        annualContribution: 4000,
        currentBalance: 10000,
        age: 35,
        coverageType: 'self-only' as const,
        contributionType: 'employee' as const,
        investmentReturn: 7,
        yearsToRetirement: 30,
        qualifiedMedicalExpenses: 2000,
        nonQualifiedWithdrawals: 0,
        incomeTaxRate: 25,
        capitalGainsTaxRate: 15,
        comparisonInvestmentReturn: 8
      };

      const result = calculateHSATripleTax(inputs);

      expect(result.hsaTaxSavings).toBeGreaterThan(0);
      expect(result.hsaNetBenefit).toBeGreaterThan(0);
      expect(result.lifetimeTaxSavings).toBeGreaterThan(0);
    });

    it('should compare HSA with traditional savings', () => {
      const inputs = {
        annualContribution: 4000,
        currentBalance: 10000,
        age: 35,
        coverageType: 'self-only' as const,
        contributionType: 'employee' as const,
        investmentReturn: 7,
        yearsToRetirement: 30,
        qualifiedMedicalExpenses: 2000,
        nonQualifiedWithdrawals: 0,
        incomeTaxRate: 25,
        capitalGainsTaxRate: 15,
        comparisonInvestmentReturn: 8
      };

      const result = calculateHSATripleTax(inputs);

      expect(result.hsaVsTraditionalAdvantage).toBeDefined();
      expect(result.hsaVsTaxableAdvantage).toBeDefined();
    });
  });

  describe('validateHSATripleTaxInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        annualContribution: 4000,
        currentBalance: 10000,
        age: 35,
        coverageType: 'self-only' as const,
        contributionType: 'employee' as const,
        investmentReturn: 7,
        yearsToRetirement: 30,
        qualifiedMedicalExpenses: 2000,
        nonQualifiedWithdrawals: 0,
        incomeTaxRate: 25,
        capitalGainsTaxRate: 15,
        comparisonInvestmentReturn: 8
      };

      const errors = validateHSATripleTaxInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should validate negative contribution', () => {
      const inputs = {
        annualContribution: -1000,
        currentBalance: 10000,
        age: 35,
        coverageType: 'self-only' as const,
        contributionType: 'employee' as const,
        investmentReturn: 7,
        yearsToRetirement: 30,
        qualifiedMedicalExpenses: 2000,
        nonQualifiedWithdrawals: 0,
        incomeTaxRate: 25,
        capitalGainsTaxRate: 15,
        comparisonInvestmentReturn: 8
      };

      const errors = validateHSATripleTaxInputs(inputs);
      expect(errors).toContain('Annual contribution must be greater than $0');
    });
  });

  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(hsaTripleTaxAdvantageCalculator.id).toBe('hsa-triple-tax-advantage-calculator');
      expect(hsaTripleTaxAdvantageCalculator.title).toBe('HSA Triple Tax Advantage Calculator');
      expect(hsaTripleTaxAdvantageCalculator.category).toBe('finance');
      expect(hsaTripleTaxAdvantageCalculator.subcategory).toBe('Retirement & Savings');
    });

    it('should have required inputs', () => {
      const requiredInputs = hsaTripleTaxAdvantageCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(11);
    });

    it('should have expected outputs', () => {
      expect(hsaTripleTaxAdvantageCalculator.outputs).toHaveLength(10);
      const outputIds = hsaTripleTaxAdvantageCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('hsaTaxSavings');
      expect(outputIds).toContain('lifetimeTaxSavings');
      expect(outputIds).toContain('hsaVsTraditionalAdvantage');
    });

    it('should have validation rules', () => {
      expect(hsaTripleTaxAdvantageCalculator.validationRules).toHaveLength(13);
    });

    it('should have examples', () => {
      expect(hsaTripleTaxAdvantageCalculator.examples).toHaveLength(2);
    });
  });
});