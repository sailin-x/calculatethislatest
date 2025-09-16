import { describe, it, expect } from 'vitest';
import { netUnrealizedAppreciationNUATaxCalculator } from './NetUnrealizedAppreciationNUATaxCalculator';
import { calculateNUA, calculateNUAMetrics, validateNUAInputs } from './formulas';

describe('Net Unrealized Appreciation (NUA) Tax Calculator', () => {
  describe('calculateNUA', () => {
    it('should calculate NUA tax benefits for employer stock', () => {
      const inputs = {
        currentSharePrice: 150,
        originalPurchasePrice: 50,
        numberOfShares: 1000,
        yearsHeld: 10,
        taxBracket: 32,
        stateTaxRate: 8,
        expectedGrowthRate: 7,
        yearsToSale: 1,
        lumpSumDistribution: true,
        includeStateTax: true,
        employerStock: true
      };

      const result = calculateNUA(inputs);

      expect(result.netUnrealizedAppreciation).toBe(100000);
      expect(result.capitalGainsTax).toBe(20000);
      expect(result.ordinaryIncomeTax).toBe(16000);
      expect(result.totalTaxLiability).toBeGreaterThan(0);
      expect(result.afterTaxValue).toBeGreaterThan(0);
      expect(result.taxSavingsVsOrdinary).toBeGreaterThan(0);
    });

    it('should calculate different results for different tax brackets', () => {
      const baseInputs = {
        currentSharePrice: 120,
        originalPurchasePrice: 80,
        numberOfShares: 500,
        yearsHeld: 8,
        stateTaxRate: 6,
        expectedGrowthRate: 6,
        yearsToSale: 2,
        lumpSumDistribution: false,
        includeStateTax: true,
        employerStock: true
      };

      const highTaxResult = calculateNUA({ ...baseInputs, taxBracket: 35 });
      const lowTaxResult = calculateNUA({ ...baseInputs, taxBracket: 22 });

      expect(highTaxResult.taxSavingsVsOrdinary).toBeGreaterThan(lowTaxResult.taxSavingsVsOrdinary);
    });
  });

  describe('validateNUAInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        currentSharePrice: 150,
        originalPurchasePrice: 50,
        numberOfShares: 1000,
        yearsHeld: 10,
        taxBracket: 32,
        stateTaxRate: 8,
        expectedGrowthRate: 7,
        yearsToSale: 1,
        lumpSumDistribution: true,
        includeStateTax: true,
        employerStock: true
      };

      const errors = validateNUAInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should validate current price less than original price', () => {
      const inputs = {
        currentSharePrice: 40,
        originalPurchasePrice: 50,
        numberOfShares: 1000,
        yearsHeld: 10,
        taxBracket: 32,
        stateTaxRate: 8,
        expectedGrowthRate: 7,
        yearsToSale: 1,
        lumpSumDistribution: true,
        includeStateTax: true,
        employerStock: true
      };

      const errors = validateNUAInputs(inputs);
      expect(errors).toContain('Current share price should be at least equal to original purchase price');
    });
  });

  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(netUnrealizedAppreciationNUATaxCalculator.id).toBe('net-unrealized-appreciation-nua-tax-calculator');
      expect(netUnrealizedAppreciationNUATaxCalculator.title).toBe('Net Unrealized Appreciation (NUA) Tax Calculator');
      expect(netUnrealizedAppreciationNUATaxCalculator.category).toBe('finance');
      expect(netUnrealizedAppreciationNUATaxCalculator.subcategory).toBe('Retirement & Savings');
    });

    it('should have required inputs', () => {
      const requiredInputs = netUnrealizedAppreciationNUATaxCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(7);
    });

    it('should have expected outputs', () => {
      expect(netUnrealizedAppreciationNUATaxCalculator.outputs).toHaveLength(8);
      const outputIds = netUnrealizedAppreciationNUATaxCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('netUnrealizedAppreciation');
      expect(outputIds).toContain('capitalGainsTax');
      expect(outputIds).toContain('taxSavingsVsOrdinary');
    });

    it('should have validation rules', () => {
      expect(netUnrealizedAppreciationNUATaxCalculator.validationRules).toHaveLength(16);
    });

    it('should have examples', () => {
      expect(netUnrealizedAppreciationNUATaxCalculator.examples).toHaveLength(2);
    });
  });
});