import { describe, it, expect } from 'vitest';
import { rothConversionTaxCalculator } from './RothConversionTaxCalculator';
import { calculateRothConversion, calculateRothConversionMetrics, validateRothConversionInputs } from './formulas';

describe('Roth Conversion Tax Calculator', () => {
  describe('calculateRothConversion', () => {
    it('should calculate conversion tax for high current bracket', () => {
      const inputs = {
        currentAge: 55,
        conversionAmount: 50000,
        currentTaxBracket: 28,
        expectedTaxBracket: 22,
        fiveYearRule: false,
        timeHorizon: 20,
        expectedReturn: 7,
        inflationRate: 2.5,
        accountType: 'traditional_ira' as const,
        includeStateTax: true,
        stateTaxRate: 5,
        medicalExpenses: 0,
        charitableContributions: 0
      };

      const result = calculateRothConversion(inputs);

      expect(result.immediateTaxLiability).toBeGreaterThan(0);
      expect(result.netConversionAmount).toBeLessThan(inputs.conversionAmount);
      expect(result.conversionEfficiency).toBeLessThan(100);
      expect(typeof result.recommendedStrategy).toBe('string');
    });

    it('should handle state tax calculations', () => {
      const inputs = {
        currentAge: 60,
        conversionAmount: 75000,
        currentTaxBracket: 24,
        expectedTaxBracket: 20,
        fiveYearRule: true,
        timeHorizon: 15,
        expectedReturn: 6,
        inflationRate: 2.5,
        accountType: '401k' as const,
        includeStateTax: false,
        stateTaxRate: 0,
        medicalExpenses: 5000,
        charitableContributions: 2000
      };

      const result = calculateRothConversion(inputs);

      expect(result.stateTaxLiability).toBe(0);
      expect(result.totalTaxLiability).toBe(result.immediateTaxLiability);
    });
  });

  describe('validateRothConversionInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        currentAge: 55,
        conversionAmount: 50000,
        currentTaxBracket: 28,
        expectedTaxBracket: 22,
        fiveYearRule: false,
        timeHorizon: 20,
        expectedReturn: 7,
        inflationRate: 2.5,
        accountType: 'traditional_ira' as const,
        includeStateTax: true,
        stateTaxRate: 5,
        medicalExpenses: 0,
        charitableContributions: 0
      };

      const errors = validateRothConversionInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should validate negative conversion amount', () => {
      const inputs = {
        currentAge: 55,
        conversionAmount: -1000,
        currentTaxBracket: 28,
        expectedTaxBracket: 22,
        fiveYearRule: false,
        timeHorizon: 20,
        expectedReturn: 7,
        inflationRate: 2.5,
        accountType: 'traditional_ira' as const,
        includeStateTax: true,
        stateTaxRate: 5,
        medicalExpenses: 0,
        charitableContributions: 0
      };

      const errors = validateRothConversionInputs(inputs);
      expect(errors).toContain('Conversion amount must be greater than $0');
    });
  });

  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(rothConversionTaxCalculator.id).toBe('roth-conversion-tax-calculator');
      expect(rothConversionTaxCalculator.title).toBe('Roth Conversion Tax Calculator');
      expect(rothConversionTaxCalculator.category).toBe('finance');
      expect(rothConversionTaxCalculator.subcategory).toBe('Retirement & Savings');
    });

    it('should have required inputs', () => {
      const requiredInputs = rothConversionTaxCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(7);
    });

    it('should have expected outputs', () => {
      expect(rothConversionTaxCalculator.outputs).toHaveLength(9);
      const outputIds = rothConversionTaxCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('immediateTaxLiability');
      expect(outputIds).toContain('conversionEfficiency');
      expect(outputIds).toContain('recommendedStrategy');
    });

    it('should have validation rules', () => {
      expect(rothConversionTaxCalculator.validationRules).toHaveLength(16);
    });

    it('should have examples', () => {
      expect(rothConversionTaxCalculator.examples).toHaveLength(2);
    });
  });
});