import { describe, it, expect } from 'vitest';
import { compoundAnnualGrowthRateCalculator } from './CompoundAnnualGrowthRateCalculator';
import { calculateCAGR, calculateCAGRMetrics, validateCAGRInputs } from './formulas';

describe('Compound Annual Growth Rate (CAGR) Calculator', () => {
  describe('calculateCAGR', () => {
    it('should calculate CAGR for positive growth', () => {
      const inputs = {
        beginningValue: 10000,
        endingValue: 15000,
        numberOfPeriods: 5,
        periodType: 'years' as const,
        includeDividends: false,
        dividendAmount: 0,
        frequency: 'annual' as const,
        inflationRate: 2.5,
        taxRate: 25
      };

      const result = calculateCAGR(inputs);

      expect(result.cagr).toBe(8.45);
      expect(result.totalReturn).toBe(50);
      expect(result.annualizedReturn).toBe(8.45);
      expect(result.realReturn).toBe(5.76);
      expect(result.afterTaxReturn).toBe(6.34);
      expect(result.compoundFrequency).toBe('Annually');
    });

    it('should handle negative growth', () => {
      const inputs = {
        beginningValue: 15000,
        endingValue: 12000,
        numberOfPeriods: 3,
        periodType: 'years' as const,
        includeDividends: false,
        dividendAmount: 0,
        frequency: 'annual' as const,
        inflationRate: 2,
        taxRate: 20
      };

      const result = calculateCAGR(inputs);

      expect(result.cagr).toBeLessThan(0);
      expect(result.totalReturn).toBeLessThan(0);
    });

    it('should include dividends when requested', () => {
      const inputs = {
        beginningValue: 10000,
        endingValue: 15000,
        numberOfPeriods: 5,
        periodType: 'years' as const,
        includeDividends: true,
        dividendAmount: 200,
        frequency: 'annual' as const,
        inflationRate: 2.5,
        taxRate: 25
      };

      const result = calculateCAGR(inputs);

      expect(result.cagr).toBeGreaterThan(8.45); // Should be higher with dividends
    });
  });

  describe('validateCAGRInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        beginningValue: 10000,
        endingValue: 15000,
        numberOfPeriods: 5,
        periodType: 'years' as const,
        includeDividends: false,
        dividendAmount: 0,
        frequency: 'annual' as const,
        inflationRate: 2.5,
        taxRate: 25
      };

      const errors = validateCAGRInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should validate zero beginning value', () => {
      const inputs = {
        beginningValue: 0,
        endingValue: 15000,
        numberOfPeriods: 5,
        periodType: 'years' as const,
        includeDividends: false,
        dividendAmount: 0,
        frequency: 'annual' as const,
        inflationRate: 2.5,
        taxRate: 25
      };

      const errors = validateCAGRInputs(inputs);
      expect(errors).toContain('Beginning value must be greater than $0');
    });
  });

  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(compoundAnnualGrowthRateCalculator.id).toBe('compound-annual-growth-rate-calculator');
      expect(compoundAnnualGrowthRateCalculator.title).toBe('Compound Annual Growth Rate (CAGR) Calculator');
      expect(compoundAnnualGrowthRateCalculator.category).toBe('finance');
      expect(compoundAnnualGrowthRateCalculator.subcategory).toBe('Investment & Portfolio');
    });

    it('should have required inputs', () => {
      const requiredInputs = compoundAnnualGrowthRateCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(4);
    });

    it('should have expected outputs', () => {
      expect(compoundAnnualGrowthRateCalculator.outputs).toHaveLength(8);
      const outputIds = compoundAnnualGrowthRateCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('cagr');
      expect(outputIds).toContain('totalReturn');
      expect(outputIds).toContain('realReturn');
    });

    it('should have validation rules', () => {
      expect(compoundAnnualGrowthRateCalculator.validationRules).toHaveLength(12);
    });

    it('should have examples', () => {
      expect(compoundAnnualGrowthRateCalculator.examples).toHaveLength(2);
    });
  });
});