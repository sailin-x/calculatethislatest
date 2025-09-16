import { describe, it, expect } from 'vitest';
import { roth401kVsTraditional401kCalculator } from './Roth401kVsTraditional401kCalculator';
import { calculateRothVsTraditional, calculateRothVsTraditionalMetrics, validateRothVsTraditionalInputs } from './formulas';

describe('Roth 401(k) vs. Traditional 401(k) Calculator', () => {
  describe('calculateRothVsTraditional', () => {
    it('should calculate comparison for higher current tax bracket', () => {
      const inputs = {
        currentAge: 35,
        retirementAge: 65,
        currentIncome: 85000,
        expectedIncomeGrowth: 3,
        currentTaxBracket: 28,
        retirementTaxBracket: 20,
        expectedReturn: 7,
        annualContribution: 6000,
        employerMatch: 50,
        employerMatchLimit: 3000,
        timeHorizon: 30,
        inflationRate: 2.5,
        rothConversionAmount: 0,
        fiveYearRule: false
      };

      const result = calculateRothVsTraditional(inputs);

      expect(result.traditional401kValue).toBeGreaterThan(0);
      expect(result.roth401kValue).toBeGreaterThan(0);
      expect(result.traditionalTaxSavings).toBeGreaterThan(0);
      expect(result.rothTaxSavings).toBe(0);
      expect(result.breakevenTaxRate).toBeGreaterThan(0);
      expect(typeof result.recommendedStrategy).toBe('string');
    });

    it('should calculate comparison for lower retirement tax bracket', () => {
      const inputs = {
        currentAge: 45,
        retirementAge: 65,
        currentIncome: 65000,
        expectedIncomeGrowth: 2,
        currentTaxBracket: 22,
        retirementTaxBracket: 15,
        expectedReturn: 6,
        annualContribution: 5500,
        employerMatch: 75,
        employerMatchLimit: 4125,
        timeHorizon: 20,
        inflationRate: 2.5,
        rothConversionAmount: 0,
        fiveYearRule: true
      };

      const result = calculateRothVsTraditional(inputs);

      expect(result.traditionalNetValue).toBeGreaterThan(result.rothNetValue);
      expect(result.recommendedStrategy).toContain('Traditional');
    });
  });

  describe('validateRothVsTraditionalInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        currentAge: 35,
        retirementAge: 65,
        currentIncome: 85000,
        expectedIncomeGrowth: 3,
        currentTaxBracket: 28,
        retirementTaxBracket: 20,
        expectedReturn: 7,
        annualContribution: 6000,
        employerMatch: 50,
        employerMatchLimit: 3000,
        timeHorizon: 30,
        inflationRate: 2.5,
        rothConversionAmount: 0,
        fiveYearRule: false
      };

      const errors = validateRothVsTraditionalInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should validate retirement age greater than current age', () => {
      const inputs = {
        currentAge: 70,
        retirementAge: 65,
        currentIncome: 85000,
        expectedIncomeGrowth: 3,
        currentTaxBracket: 28,
        retirementTaxBracket: 20,
        expectedReturn: 7,
        annualContribution: 6000,
        employerMatch: 50,
        employerMatchLimit: 3000,
        timeHorizon: 30,
        inflationRate: 2.5,
        rothConversionAmount: 0,
        fiveYearRule: false
      };

      const errors = validateRothVsTraditionalInputs(inputs);
      expect(errors).toContain('Retirement age must be greater than current age');
    });
  });

  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(roth401kVsTraditional401kCalculator.id).toBe('roth-401k-vs-traditional-401k-calculator');
      expect(roth401kVsTraditional401kCalculator.title).toBe('Roth 401(k) vs. Traditional 401(k) Calculator');
      expect(roth401kVsTraditional401kCalculator.category).toBe('finance');
      expect(roth401kVsTraditional401kCalculator.subcategory).toBe('Retirement & Savings');
    });

    it('should have required inputs', () => {
      const requiredInputs = roth401kVsTraditional401kCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(8);
    });

    it('should have expected outputs', () => {
      expect(roth401kVsTraditional401kCalculator.outputs).toHaveLength(10);
      const outputIds = roth401kVsTraditional401kCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('traditional401kValue');
      expect(outputIds).toContain('roth401kValue');
      expect(outputIds).toContain('recommendedStrategy');
    });

    it('should have validation rules', () => {
      expect(roth401kVsTraditional401kCalculator.validationRules).toHaveLength(16);
    });

    it('should have examples', () => {
      expect(roth401kVsTraditional401kCalculator.examples).toHaveLength(2);
    });
  });
});