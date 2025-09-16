import { describe, it, expect } from 'vitest';
import { megaBackdoorRothCalculator } from './MegaBackdoorRothCalculator';
import { calculateMegaBackdoorRoth, calculateMegaBackdoorRothMetrics, validateMegaBackdoorRothInputs } from './formulas';

describe('Mega Backdoor Roth Calculator', () => {
  describe('calculateMegaBackdoorRoth', () => {
    it('should calculate Mega Backdoor Roth benefits', () => {
      const inputs = {
        currentAge: 45,
        annualSalary: 250000,
        employerMatch: 6,
        current401kBalance: 750000,
        currentRothBalance: 150000,
        expectedReturn: 7,
        yearsToRetirement: 20,
        taxBracket: 35,
        stateTaxRate: 10,
        inflationRate: 2.5,
        includeAfterTaxContributions: true,
        includeEmployerMatch: true,
        recharacterizationStrategy: false
      };

      const result = calculateMegaBackdoorRoth(inputs);

      expect(result.maxAnnualContribution).toBeGreaterThan(0);
      expect(result.afterTaxContribution).toBeGreaterThan(0);
      expect(result.rothConversionAmount).toBeGreaterThan(0);
      expect(result.taxSavings).toBeGreaterThan(0);
      expect(result.futureRothValue).toBeGreaterThan(150000);
      expect(result.netBenefit).toBeGreaterThan(0);
    });

    it('should calculate different results with and without after-tax contributions', () => {
      const baseInputs = {
        currentAge: 45,
        annualSalary: 200000,
        employerMatch: 6,
        current401kBalance: 500000,
        currentRothBalance: 100000,
        expectedReturn: 7,
        yearsToRetirement: 20,
        taxBracket: 32,
        stateTaxRate: 8,
        inflationRate: 2.5,
        includeEmployerMatch: true,
        recharacterizationStrategy: false
      };

      const withContributions = calculateMegaBackdoorRoth({ ...baseInputs, includeAfterTaxContributions: true });
      const withoutContributions = calculateMegaBackdoorRoth({ ...baseInputs, includeAfterTaxContributions: false });

      expect(withContributions.afterTaxContribution).toBeGreaterThan(withoutContributions.afterTaxContribution);
      expect(withContributions.futureRothValue).toBeGreaterThan(withoutContributions.futureRothValue);
    });
  });

  describe('validateMegaBackdoorRothInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        currentAge: 45,
        annualSalary: 250000,
        employerMatch: 6,
        current401kBalance: 750000,
        currentRothBalance: 150000,
        expectedReturn: 7,
        yearsToRetirement: 20,
        taxBracket: 35,
        stateTaxRate: 10,
        inflationRate: 2.5,
        includeAfterTaxContributions: true,
        includeEmployerMatch: true,
        recharacterizationStrategy: false
      };

      const errors = validateMegaBackdoorRothInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should validate negative salary', () => {
      const inputs = {
        currentAge: 45,
        annualSalary: -50000,
        employerMatch: 6,
        current401kBalance: 750000,
        currentRothBalance: 150000,
        expectedReturn: 7,
        yearsToRetirement: 20,
        taxBracket: 35,
        stateTaxRate: 10,
        inflationRate: 2.5,
        includeAfterTaxContributions: true,
        includeEmployerMatch: true,
        recharacterizationStrategy: false
      };

      const errors = validateMegaBackdoorRothInputs(inputs);
      expect(errors).toContain('Annual salary cannot be negative');
    });
  });

  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(megaBackdoorRothCalculator.id).toBe('mega-backdoor-roth-calculator');
      expect(megaBackdoorRothCalculator.title).toBe('Mega Backdoor Roth Calculator');
      expect(megaBackdoorRothCalculator.category).toBe('finance');
      expect(megaBackdoorRothCalculator.subcategory).toBe('Retirement & Savings');
    });

    it('should have required inputs', () => {
      const requiredInputs = megaBackdoorRothCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(7);
    });

    it('should have expected outputs', () => {
      expect(megaBackdoorRothCalculator.outputs).toHaveLength(10);
      const outputIds = megaBackdoorRothCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('maxAnnualContribution');
      expect(outputIds).toContain('taxSavings');
      expect(outputIds).toContain('futureRothValue');
    });

    it('should have validation rules', () => {
      expect(megaBackdoorRothCalculator.validationRules).toHaveLength(16);
    });

    it('should have examples', () => {
      expect(megaBackdoorRothCalculator.examples).toHaveLength(2);
    });
  });
});