import { describe, it, expect } from 'vitest';
import { realEstateSyndicationCalculator } from './RealEstateSyndicationCalculator';
import { calculateRealEstateSyndication } from './formulas';
import { validateRealEstateSyndicationInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

describe('Real Estate Syndication Calculator', () => {
  describe('calculateRealEstateSyndication', () => {
    it('should calculate multifamily syndication correctly', () => {
      const inputs = {
        propertyType: 'multifamily',
        totalProjectCost: 10000000,
        sponsorEquity: 1000000,
        investorEquity: 4000000,
        debtAmount: 5000000,
        debtRate: 5.5,
        debtTerm: 10,
        holdingPeriod: 5,
        annualNOI: 800000,
        noiGrowthRate: 3,
        exitCapRate: 6.5,
        sponsorPromote: 20,
        investorPreferredReturn: 8,
        sponsorManagementFee: 1.5,
        acquisitionFee: 1,
        dispositionFee: 1,
        operatingExpenses: 35,
        taxRate: 25
      };

      const result = calculateRealEstateSyndication(inputs);

      expect(result.totalEquity).toBe(5000000);
      expect(result.leverageRatio).toBe(0.5);
      expect(result.annualCashFlow).toBeGreaterThan(0);
      expect(result.cashOnCashReturn).toBeGreaterThan(0);
      expect(result.totalReturn).toBeGreaterThanOrEqual(0);
      expect(result.irr).toBeGreaterThan(0);
      expect(result.sponsorIrr).toBeGreaterThan(0);
      expect(result.equityMultiple).toBeGreaterThan(1);
      expect(result.exitValue).toBeGreaterThan(inputs.totalProjectCost);
      expect(result.totalProfit).toBeGreaterThan(0);
      expect(result.investorProfit).toBeGreaterThan(0);
      expect(result.sponsorProfit).toBeGreaterThan(0);
    });

    it('should calculate office syndication with high promote correctly', () => {
      const inputs = {
        propertyType: 'office',
        totalProjectCost: 25000000,
        sponsorEquity: 2500000,
        investorEquity: 10000000,
        debtAmount: 12500000,
        debtRate: 6.0,
        debtTerm: 15,
        holdingPeriod: 7,
        annualNOI: 2000000,
        noiGrowthRate: 2.5,
        exitCapRate: 7.0,
        sponsorPromote: 30,
        investorPreferredReturn: 7,
        sponsorManagementFee: 2.0,
        acquisitionFee: 1.5,
        dispositionFee: 1.5,
        operatingExpenses: 40,
        taxRate: 30
      };

      const result = calculateRealEstateSyndication(inputs);

      expect(result.totalEquity).toBe(12500000);
      expect(result.leverageRatio).toBe(0.5);
      expect(result.annualCashFlow).toBeGreaterThan(0);
      expect(result.cashOnCashReturn).toBeGreaterThan(0);
      expect(result.totalReturn).toBeGreaterThanOrEqual(0);
      expect(result.irr).toBeGreaterThan(0);
      expect(result.sponsorIrr).toBeGreaterThanOrEqual(result.irr); // Sponsor should have higher or equal IRR
      expect(result.equityMultiple).toBeGreaterThan(1);
      expect(result.exitValue).toBeGreaterThan(inputs.totalProjectCost);
      expect(result.totalProfit).toBeGreaterThan(0);
      expect(result.investorProfit).toBeGreaterThan(0);
      expect(result.sponsorProfit).toBeGreaterThan(0);
    });

    it('should calculate land development syndication correctly', () => {
      const inputs = {
        propertyType: 'land',
        totalProjectCost: 5000000,
        sponsorEquity: 500000,
        investorEquity: 2000000,
        debtAmount: 2500000,
        debtRate: 7.0,
        debtTerm: 5,
        holdingPeriod: 3,
        annualNOI: 0,
        noiGrowthRate: 0,
        exitCapRate: 8.0,
        sponsorPromote: 25,
        investorPreferredReturn: 10,
        sponsorManagementFee: 3.0,
        acquisitionFee: 2.0,
        dispositionFee: 2.0,
        operatingExpenses: 0,
        taxRate: 25
      };

      const result = calculateRealEstateSyndication(inputs);

      expect(result.totalEquity).toBe(2500000);
      expect(result.leverageRatio).toBe(0.5);
      expect(result.annualCashFlow).toBeLessThan(0); // Negative cash flow for land development
      expect(result.cashOnCashReturn).toBeLessThan(0);
      expect(result.totalReturn).toBeGreaterThanOrEqual(0);
      expect(result.irr).toBeGreaterThan(0);
      expect(result.sponsorIrr).toBeGreaterThan(result.irr);
      expect(result.equityMultiple).toBeGreaterThan(1);
      expect(result.exitValue).toBeGreaterThan(inputs.totalProjectCost);
      expect(result.totalProfit).toBeGreaterThan(0);
      expect(result.investorProfit).toBeGreaterThan(0);
      expect(result.sponsorProfit).toBeGreaterThan(0);
    });
  });

  describe('Additional utility functions', () => {
    it('should calculate debt service correctly', () => {
      const inputs = {
        propertyType: 'multifamily',
        totalProjectCost: 10000000,
        sponsorEquity: 1000000,
        investorEquity: 4000000,
        debtAmount: 5000000,
        debtRate: 5.5,
        debtTerm: 10,
        holdingPeriod: 5,
        annualNOI: 800000,
        noiGrowthRate: 3,
        exitCapRate: 6.5,
        sponsorPromote: 20,
        investorPreferredReturn: 8,
        sponsorManagementFee: 1.5,
        acquisitionFee: 1,
        dispositionFee: 1,
        operatingExpenses: 35,
        taxRate: 25
      };

      const result = calculateRealEstateSyndication(inputs);
      
      // Annual cash flow should be less than NOI due to debt service and fees
      expect(result.annualCashFlow).toBeLessThan(inputs.annualNOI);
    });

    it('should handle waterfall distribution correctly', () => {
      const inputs = {
        propertyType: 'multifamily',
        totalProjectCost: 10000000,
        sponsorEquity: 1000000,
        investorEquity: 4000000,
        debtAmount: 5000000,
        debtRate: 5.5,
        debtTerm: 10,
        holdingPeriod: 5,
        annualNOI: 800000,
        noiGrowthRate: 3,
        exitCapRate: 6.5,
        sponsorPromote: 20,
        investorPreferredReturn: 8,
        sponsorManagementFee: 1.5,
        acquisitionFee: 1,
        dispositionFee: 1,
        operatingExpenses: 35,
        taxRate: 25
      };

      const result = calculateRealEstateSyndication(inputs);
      
      // Total profit should equal investor profit plus sponsor profit
      expect(result.totalProfit).toBeCloseTo(result.investorProfit + result.sponsorProfit, 0);
    });
  });

  describe('validateRealEstateSyndicationInputs', () => {
    it('should validate required fields', () => {
      const inputs = {
        propertyType: '',
        totalProjectCost: 0,
        sponsorEquity: -1000,
        investorEquity: 0,
        debtAmount: 0,
        debtRate: 0,
        debtTerm: 0,
        holdingPeriod: 0,
        annualNOI: 0,
        noiGrowthRate: 0,
        exitCapRate: 0,
        sponsorPromote: 0,
        investorPreferredReturn: 0,
        sponsorManagementFee: 0,
        acquisitionFee: 0,
        dispositionFee: 0,
        operatingExpenses: 0,
        taxRate: 0
      };

      const errors = validateRealEstateSyndicationInputs(inputs);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors).toContain('Property type is required');
      expect(errors).toContain('Total project cost is required');
      expect(errors).toContain('Sponsor equity must be between $0 and $1 billion');
    });

    it('should validate business logic', () => {
      const inputs = {
        propertyType: 'multifamily',
        totalProjectCost: 10000000,
        sponsorEquity: 100000, // Too low (1% of total equity)
        investorEquity: 4000000,
        debtAmount: 5000000,
        debtRate: 5.5,
        debtTerm: 10,
        holdingPeriod: 5,
        annualNOI: 800000,
        noiGrowthRate: 3,
        exitCapRate: 6.5,
        sponsorPromote: 20,
        investorPreferredReturn: 8,
        sponsorManagementFee: 1.5,
        acquisitionFee: 1,
        dispositionFee: 1,
        operatingExpenses: 35,
        taxRate: 25
      };

      const errors = validateRealEstateSyndicationInputs(inputs);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors).toContain('Sponsor equity should typically be at least 5% of total equity');
    });

    it('should validate capital structure', () => {
      const inputs = {
        propertyType: 'multifamily',
        totalProjectCost: 10000000,
        sponsorEquity: 1000000,
        investorEquity: 4000000,
        debtAmount: 4000000, // Doesn't add up to total project cost
        debtRate: 5.5,
        debtTerm: 10,
        holdingPeriod: 5,
        annualNOI: 800000,
        noiGrowthRate: 3,
        exitCapRate: 6.5,
        sponsorPromote: 20,
        investorPreferredReturn: 8,
        sponsorManagementFee: 1.5,
        acquisitionFee: 1,
        dispositionFee: 1,
        operatingExpenses: 35,
        taxRate: 25
      };

      const errors = validateRealEstateSyndicationInputs(inputs);
      expect(errors).toContain('Total capital (equity + debt) should approximately equal total project cost');
    });

    it('should pass validation with valid inputs', () => {
      const inputs = {
        propertyType: 'multifamily',
        totalProjectCost: 10000000,
        sponsorEquity: 1000000,
        investorEquity: 4000000,
        debtAmount: 5000000,
        debtRate: 5.5,
        debtTerm: 10,
        holdingPeriod: 5,
        annualNOI: 800000,
        noiGrowthRate: 3,
        exitCapRate: 6.5,
        sponsorPromote: 20,
        investorPreferredReturn: 8,
        sponsorManagementFee: 1.5,
        acquisitionFee: 1,
        dispositionFee: 1,
        operatingExpenses: 35,
        taxRate: 25
      };

      const errors = validateRealEstateSyndicationInputs(inputs);
      expect(errors.length).toBe(0);
    });
  });

  describe('quickValidateAllInputs', () => {
    it('should validate all inputs and return results', () => {
      const inputs = {
        propertyType: 'multifamily',
        totalProjectCost: 10000000,
        sponsorEquity: 1000000,
        investorEquity: 4000000,
        debtAmount: 5000000,
        debtRate: 5.5,
        debtTerm: 10,
        holdingPeriod: 5,
        annualNOI: 800000,
        noiGrowthRate: 3,
        exitCapRate: 6.5,
        sponsorPromote: 20,
        investorPreferredReturn: 8,
        sponsorManagementFee: 1.5,
        acquisitionFee: 1,
        dispositionFee: 1,
        operatingExpenses: 35,
        taxRate: 25
      };

      const results = quickValidateAllInputs(inputs);
      expect(results).toHaveLength(18);
      expect(results.every(r => r.status === 'success')).toBe(true);
    });

    it('should validate capital structure consistency', () => {
      const inputs = {
        propertyType: 'multifamily',
        totalProjectCost: 10000000,
        sponsorEquity: 1000000,
        investorEquity: 4000000,
        debtAmount: 5000000,
        debtRate: 5.5,
        debtTerm: 10,
        holdingPeriod: 5,
        annualNOI: 800000,
        noiGrowthRate: 3,
        exitCapRate: 6.5,
        sponsorPromote: 20,
        investorPreferredReturn: 8,
        sponsorManagementFee: 1.5,
        acquisitionFee: 1,
        dispositionFee: 1,
        operatingExpenses: 35,
        taxRate: 25
      };

      const results = quickValidateAllInputs(inputs);
      const totalProjectCostResult = results.find(r => r.field === 'totalProjectCost');
      expect(totalProjectCostResult?.status).toBe('success');
    });
  });

  describe('Calculator Interface', () => {
    it('should have correct structure', () => {
      expect(realEstateSyndicationCalculator.id).toBe('real-estate-syndication');
      expect(realEstateSyndicationCalculator.name).toBe('Real Estate Syndication Calculator');
      expect(realEstateSyndicationCalculator.category).toBe('Finance');
      expect(realEstateSyndicationCalculator.inputs).toHaveLength(18);
      expect(realEstateSyndicationCalculator.outputs).toHaveLength(12);
      expect(realEstateSyndicationCalculator.examples).toHaveLength(3);
    });

    it('should have required inputs', () => {
      const requiredInputs = realEstateSyndicationCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(18);
    });

    it('should have valid input types', () => {
      const inputs = realEstateSyndicationCalculator.inputs;
      const validTypes = ['number', 'select', 'text', 'date', 'object'];
      
      inputs.forEach(input => {
        expect(validTypes).toContain(input.type);
      });
    });

    it('should have valid output types', () => {
      const outputs = realEstateSyndicationCalculator.outputs;
      const validTypes = ['currency', 'percentage', 'number', 'array'];
      
      outputs.forEach(output => {
        expect(validTypes).toContain(output.type);
      });
    });
  });

  describe('Integration Tests', () => {
    it('should process example 1 correctly', () => {
      const example = realEstateSyndicationCalculator.examples[0];
      const result = calculateRealEstateSyndication(example.inputs);
      
      expect(result.totalEquity).toBe(example.expectedOutputs.totalEquity);
      expect(result.leverageRatio).toBe(example.expectedOutputs.leverageRatio);
      expect(result.annualCashFlow).toBeCloseTo(example.expectedOutputs.annualCashFlow, 0);
      expect(result.cashOnCashReturn).toBeCloseTo(example.expectedOutputs.cashOnCashReturn, 3);
      expect(result.totalReturn).toBeCloseTo(example.expectedOutputs.totalReturn, 2);
      expect(result.irr).toBeCloseTo(example.expectedOutputs.irr, 2);
      expect(result.sponsorIrr).toBeCloseTo(example.expectedOutputs.sponsorIrr, 2);
      expect(result.equityMultiple).toBeCloseTo(example.expectedOutputs.equityMultiple, 2);
      expect(result.exitValue).toBeCloseTo(example.expectedOutputs.exitValue, -2);
      expect(result.totalProfit).toBeCloseTo(example.expectedOutputs.totalProfit, -2);
      expect(result.investorProfit).toBeCloseTo(example.expectedOutputs.investorProfit, -2);
      expect(result.sponsorProfit).toBeCloseTo(example.expectedOutputs.sponsorProfit, -2);
    });

    it('should process example 2 correctly', () => {
      const example = realEstateSyndicationCalculator.examples[1];
      const result = calculateRealEstateSyndication(example.inputs);
      
      expect(result.totalEquity).toBe(example.expectedOutputs.totalEquity);
      expect(result.leverageRatio).toBe(example.expectedOutputs.leverageRatio);
      expect(result.annualCashFlow).toBeGreaterThan(0);
      expect(result.cashOnCashReturn).toBeGreaterThan(0);
      expect(result.totalReturn).toBeGreaterThanOrEqual(0);
      expect(result.irr).toBeGreaterThan(0);
      expect(result.sponsorIrr).toBeGreaterThan(result.irr);
      expect(result.equityMultiple).toBeGreaterThan(1);
      expect(result.exitValue).toBeGreaterThan(example.inputs.totalProjectCost);
      expect(result.totalProfit).toBeGreaterThan(0);
      expect(result.investorProfit).toBeGreaterThan(0);
      expect(result.sponsorProfit).toBeGreaterThan(0);
    });

    it('should process example 3 correctly', () => {
      const example = realEstateSyndicationCalculator.examples[2];
      const result = calculateRealEstateSyndication(example.inputs);
      
      expect(result.totalEquity).toBe(example.expectedOutputs.totalEquity);
      expect(result.leverageRatio).toBe(example.expectedOutputs.leverageRatio);
      expect(result.annualCashFlow).toBeLessThan(0); // Land development has negative cash flow
      expect(result.cashOnCashReturn).toBeLessThan(0);
      expect(result.totalReturn).toBeGreaterThanOrEqual(0);
      expect(result.irr).toBeGreaterThan(0);
      expect(result.sponsorIrr).toBeGreaterThan(result.irr);
      expect(result.equityMultiple).toBeGreaterThan(1);
      expect(result.exitValue).toBeGreaterThan(example.inputs.totalProjectCost);
      expect(result.totalProfit).toBeGreaterThan(0);
      expect(result.investorProfit).toBeGreaterThan(0);
      expect(result.sponsorProfit).toBeGreaterThan(0);
    });
  });
});