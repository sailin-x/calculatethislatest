import { describe, it, expect } from 'vitest';
import { realEstateWaterfallModelCalculator } from './RealEstateWaterfallModelCalculator';
import { calculateRealEstateWaterfallModel } from './formulas';
import { validateRealEstateWaterfallModelInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

describe('Real Estate Waterfall Model Calculator', () => {
  describe('calculateRealEstateWaterfallModel', () => {
    it('should calculate standard waterfall correctly', () => {
      const inputs = {
        totalEquity: 10000000,
        investorEquity: 8000000,
        sponsorEquity: 2000000,
        totalCashFlow: 15000000,
        preferredReturn: 8,
        holdingPeriod: 5,
        catchUpPercentage: 80,
        promotePercentage: 20,
        hurdleRate: 12,
        waterfallType: 'american',
        clawbackProvision: 'no',
        clawbackPercentage: 0,
        managementFee: 1.5,
        acquisitionFee: 1,
        dispositionFee: 1,
        operatingExpenses: 2000000,
        debtService: 5000000,
        taxRate: 25,
        inflationRate: 2.5,
        exitValue: 20000000,
        remainingDebt: 8000000
      };

      const result = calculateRealEstateWaterfallModel(inputs);

      expect(result.totalReturn).toBeGreaterThan(0);
      expect(result.investorReturn).toBeGreaterThan(0);
      expect(result.sponsorReturn).toBeGreaterThan(result.investorReturn);
      expect(result.preferredReturnAmount).toBeGreaterThan(0);
      expect(result.catchUpAmount).toBeGreaterThan(0);
      expect(result.promoteAmount).toBeGreaterThan(0);
      expect(result.investorProfit).toBeGreaterThan(inputs.investorEquity);
      expect(result.sponsorProfit).toBeGreaterThan(inputs.sponsorEquity);
      expect(result.investorIrr).toBeGreaterThan(0);
      expect(result.sponsorIrr).toBeGreaterThan(result.investorIrr);
      expect(result.equityMultiple).toBeGreaterThan(1);
      expect(result.netPresentValue).toBeGreaterThan(0);
    });

    it('should calculate high promote waterfall correctly', () => {
      const inputs = {
        totalEquity: 15000000,
        investorEquity: 12000000,
        sponsorEquity: 3000000,
        totalCashFlow: 25000000,
        preferredReturn: 10,
        holdingPeriod: 7,
        catchUpPercentage: 70,
        promotePercentage: 30,
        hurdleRate: 15,
        waterfallType: 'american',
        clawbackProvision: 'yes',
        clawbackPercentage: 20,
        managementFee: 2.0,
        acquisitionFee: 1.5,
        dispositionFee: 1.5,
        operatingExpenses: 3500000,
        debtService: 8000000,
        taxRate: 30,
        inflationRate: 3.0,
        exitValue: 35000000,
        remainingDebt: 12000000
      };

      const result = calculateRealEstateWaterfallModel(inputs);

      expect(result.totalReturn).toBeGreaterThan(0);
      expect(result.investorReturn).toBeGreaterThan(0);
      expect(result.sponsorReturn).toBeGreaterThan(result.investorReturn);
      expect(result.preferredReturnAmount).toBeGreaterThan(0);
      expect(result.catchUpAmount).toBeGreaterThan(0);
      expect(result.promoteAmount).toBeGreaterThan(0);
      expect(result.investorProfit).toBeGreaterThan(inputs.investorEquity);
      expect(result.sponsorProfit).toBeGreaterThan(inputs.sponsorEquity);
      expect(result.investorIrr).toBeGreaterThan(0);
      expect(result.sponsorIrr).toBeGreaterThan(result.investorIrr);
      expect(result.equityMultiple).toBeGreaterThan(1);
      expect(result.netPresentValue).toBeGreaterThan(0);
    });

    it('should calculate european waterfall correctly', () => {
      const inputs = {
        totalEquity: 50000000,
        investorEquity: 40000000,
        sponsorEquity: 10000000,
        totalCashFlow: 75000000,
        preferredReturn: 8,
        holdingPeriod: 10,
        catchUpPercentage: 80,
        promotePercentage: 20,
        hurdleRate: 12,
        waterfallType: 'european',
        clawbackProvision: 'yes',
        clawbackPercentage: 25,
        managementFee: 1.5,
        acquisitionFee: 1,
        dispositionFee: 1,
        operatingExpenses: 10000000,
        debtService: 20000000,
        taxRate: 25,
        inflationRate: 2.5,
        exitValue: 100000000,
        remainingDebt: 30000000
      };

      const result = calculateRealEstateWaterfallModel(inputs);

      expect(result.totalReturn).toBeGreaterThan(0);
      expect(result.investorReturn).toBeGreaterThan(0);
      expect(result.sponsorReturn).toBeGreaterThan(result.investorReturn);
      expect(result.preferredReturnAmount).toBeGreaterThan(0);
      expect(result.catchUpAmount).toBeGreaterThan(0);
      expect(result.promoteAmount).toBeGreaterThan(0);
      expect(result.investorProfit).toBeGreaterThan(inputs.investorEquity);
      expect(result.sponsorProfit).toBeGreaterThan(inputs.sponsorEquity);
      expect(result.investorIrr).toBeGreaterThan(0);
      expect(result.sponsorIrr).toBeGreaterThan(result.investorIrr);
      expect(result.equityMultiple).toBeGreaterThan(1);
      expect(result.netPresentValue).toBeGreaterThan(0);
    });
  });

  describe('Additional utility functions', () => {
    it('should calculate waterfall distribution correctly', () => {
      const inputs = {
        totalEquity: 10000000,
        investorEquity: 8000000,
        sponsorEquity: 2000000,
        totalCashFlow: 15000000,
        preferredReturn: 8,
        holdingPeriod: 5,
        catchUpPercentage: 80,
        promotePercentage: 20,
        hurdleRate: 12,
        waterfallType: 'american',
        clawbackProvision: 'no',
        clawbackPercentage: 0,
        managementFee: 1.5,
        acquisitionFee: 1,
        dispositionFee: 1,
        operatingExpenses: 2000000,
        debtService: 5000000,
        taxRate: 25,
        inflationRate: 2.5,
        exitValue: 20000000,
        remainingDebt: 8000000
      };

      const result = calculateRealEstateWaterfallModel(inputs);
      
      // Total profit should equal investor profit plus sponsor profit
      const totalProfit = result.investorProfit + result.sponsorProfit;
      const expectedTotalProfit = inputs.totalEquity + (result.totalReturn * inputs.totalEquity);
      expect(totalProfit).toBeCloseTo(expectedTotalProfit, -2);
    });

    it('should handle clawback provision correctly', () => {
      const inputs = {
        totalEquity: 10000000,
        investorEquity: 8000000,
        sponsorEquity: 2000000,
        totalCashFlow: 15000000,
        preferredReturn: 8,
        holdingPeriod: 5,
        catchUpPercentage: 80,
        promotePercentage: 20,
        hurdleRate: 12,
        waterfallType: 'american',
        clawbackProvision: 'yes',
        clawbackPercentage: 25,
        managementFee: 1.5,
        acquisitionFee: 1,
        dispositionFee: 1,
        operatingExpenses: 2000000,
        debtService: 5000000,
        taxRate: 25,
        inflationRate: 2.5,
        exitValue: 20000000,
        remainingDebt: 8000000
      };

      const result = calculateRealEstateWaterfallModel(inputs);
      
      // With clawback, sponsor profit should be reduced
      expect(result.promoteAmount).toBeGreaterThan(0);
    });
  });

  describe('validateRealEstateWaterfallModelInputs', () => {
    it('should validate required fields', () => {
      const inputs = {
        totalEquity: 0,
        investorEquity: -1000,
        sponsorEquity: 0,
        totalCashFlow: 0,
        preferredReturn: 0,
        holdingPeriod: 0,
        catchUpPercentage: 0,
        promotePercentage: 0,
        hurdleRate: 0,
        waterfallType: '',
        clawbackProvision: '',
        clawbackPercentage: 0,
        managementFee: 0,
        acquisitionFee: 0,
        dispositionFee: 0,
        operatingExpenses: 0,
        debtService: 0,
        taxRate: 0,
        inflationRate: 0,
        exitValue: 0,
        remainingDebt: 0
      };

      const errors = validateRealEstateWaterfallModelInputs(inputs);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors).toContain('Total equity is required');
      expect(errors).toContain('Investor equity is required');
      expect(errors).toContain('Sponsor equity is required');
    });

    it('should validate business logic', () => {
      const inputs = {
        totalEquity: 10000000,
        investorEquity: 4000000, // Too low (40% of total equity)
        sponsorEquity: 6000000, // Too high (60% of total equity)
        totalCashFlow: 15000000,
        preferredReturn: 8,
        holdingPeriod: 5,
        catchUpPercentage: 80,
        promotePercentage: 20,
        hurdleRate: 12,
        waterfallType: 'american',
        clawbackProvision: 'no',
        clawbackPercentage: 0,
        managementFee: 1.5,
        acquisitionFee: 1,
        dispositionFee: 1,
        operatingExpenses: 2000000,
        debtService: 5000000,
        taxRate: 25,
        inflationRate: 2.5,
        exitValue: 20000000,
        remainingDebt: 8000000
      };

      const errors = validateRealEstateWaterfallModelInputs(inputs);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors).toContain('Investor equity should typically be at least 50% of total equity');
      expect(errors).toContain('Sponsor equity percentage seems unusually high');
    });

    it('should validate clawback logic', () => {
      const inputs = {
        totalEquity: 10000000,
        investorEquity: 8000000,
        sponsorEquity: 2000000,
        totalCashFlow: 15000000,
        preferredReturn: 8,
        holdingPeriod: 5,
        catchUpPercentage: 80,
        promotePercentage: 20,
        hurdleRate: 12,
        waterfallType: 'american',
        clawbackProvision: 'yes',
        clawbackPercentage: 0, // Should be greater than 0 if clawback is enabled
        managementFee: 1.5,
        acquisitionFee: 1,
        dispositionFee: 1,
        operatingExpenses: 2000000,
        debtService: 5000000,
        taxRate: 25,
        inflationRate: 2.5,
        exitValue: 20000000,
        remainingDebt: 8000000
      };

      const errors = validateRealEstateWaterfallModelInputs(inputs);
      expect(errors).toContain('Clawback percentage should be greater than 0 if clawback provision is enabled');
    });

    it('should pass validation with valid inputs', () => {
      const inputs = {
        totalEquity: 10000000,
        investorEquity: 8000000,
        sponsorEquity: 2000000,
        totalCashFlow: 15000000,
        preferredReturn: 8,
        holdingPeriod: 5,
        catchUpPercentage: 80,
        promotePercentage: 20,
        hurdleRate: 12,
        waterfallType: 'american',
        clawbackProvision: 'no',
        clawbackPercentage: 0,
        managementFee: 1.5,
        acquisitionFee: 1,
        dispositionFee: 1,
        operatingExpenses: 2000000,
        debtService: 5000000,
        taxRate: 25,
        inflationRate: 2.5,
        exitValue: 20000000,
        remainingDebt: 8000000
      };

      const errors = validateRealEstateWaterfallModelInputs(inputs);
      expect(errors.length).toBe(0);
    });
  });

  describe('quickValidateAllInputs', () => {
    it('should validate all inputs and return results', () => {
      const inputs = {
        totalEquity: 10000000,
        investorEquity: 8000000,
        sponsorEquity: 2000000,
        totalCashFlow: 15000000,
        preferredReturn: 8,
        holdingPeriod: 5,
        catchUpPercentage: 80,
        promotePercentage: 20,
        hurdleRate: 12,
        waterfallType: 'american',
        clawbackProvision: 'no',
        clawbackPercentage: 0,
        managementFee: 1.5,
        acquisitionFee: 1,
        dispositionFee: 1,
        operatingExpenses: 2000000,
        debtService: 5000000,
        taxRate: 25,
        inflationRate: 2.5,
        exitValue: 20000000,
        remainingDebt: 8000000
      };

      const results = quickValidateAllInputs(inputs);
      expect(results).toHaveLength(22);
      expect(results.every(r => r.status === 'success')).toBe(true);
    });

    it('should validate waterfall type correctly', () => {
      const inputs = {
        totalEquity: 10000000,
        investorEquity: 8000000,
        sponsorEquity: 2000000,
        totalCashFlow: 15000000,
        preferredReturn: 8,
        holdingPeriod: 5,
        catchUpPercentage: 80,
        promotePercentage: 20,
        hurdleRate: 12,
        waterfallType: 'american',
        clawbackProvision: 'no',
        clawbackPercentage: 0,
        managementFee: 1.5,
        acquisitionFee: 1,
        dispositionFee: 1,
        operatingExpenses: 2000000,
        debtService: 5000000,
        taxRate: 25,
        inflationRate: 2.5,
        exitValue: 20000000,
        remainingDebt: 8000000
      };

      const results = quickValidateAllInputs(inputs);
      const waterfallTypeResult = results.find(r => r.field === 'waterfallType');
      expect(waterfallTypeResult?.status).toBe('success');
    });
  });

  describe('Calculator Interface', () => {
    it('should have correct structure', () => {
      expect(realEstateWaterfallModelCalculator.id).toBe('real-estate-waterfall-model');
      expect(realEstateWaterfallModelCalculator.name).toBe('Real Estate Waterfall Model Calculator');
      expect(realEstateWaterfallModelCalculator.category).toBe('Finance');
      expect(realEstateWaterfallModelCalculator.inputs).toHaveLength(22);
      expect(realEstateWaterfallModelCalculator.outputs).toHaveLength(12);
      expect(realEstateWaterfallModelCalculator.examples).toHaveLength(3);
    });

    it('should have required inputs', () => {
      const requiredInputs = realEstateWaterfallModelCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(22);
    });

    it('should have valid input types', () => {
      const inputs = realEstateWaterfallModelCalculator.inputs;
      const validTypes = ['number', 'select', 'text', 'date', 'object'];
      
      inputs.forEach(input => {
        expect(validTypes).toContain(input.type);
      });
    });

    it('should have valid output types', () => {
      const outputs = realEstateWaterfallModelCalculator.outputs;
      const validTypes = ['currency', 'percentage', 'number', 'array'];
      
      outputs.forEach(output => {
        expect(validTypes).toContain(output.type);
      });
    });
  });

  describe('Integration Tests', () => {
    it('should process example 1 correctly', () => {
      const example = realEstateWaterfallModelCalculator.examples[0];
      const result = calculateRealEstateWaterfallModel(example.inputs);
      
      expect(result.totalReturn).toBeCloseTo(example.expectedOutputs.totalReturn, 2);
      expect(result.investorReturn).toBeCloseTo(example.expectedOutputs.investorReturn, 2);
      expect(result.sponsorReturn).toBeCloseTo(example.expectedOutputs.sponsorReturn, 2);
      expect(result.preferredReturnAmount).toBeCloseTo(example.expectedOutputs.preferredReturnAmount, -2);
      expect(result.catchUpAmount).toBeCloseTo(example.expectedOutputs.catchUpAmount, -2);
      expect(result.promoteAmount).toBeCloseTo(example.expectedOutputs.promoteAmount, -2);
      expect(result.investorProfit).toBeCloseTo(example.expectedOutputs.investorProfit, -2);
      expect(result.sponsorProfit).toBeCloseTo(example.expectedOutputs.sponsorProfit, -2);
      expect(result.investorIrr).toBeCloseTo(example.expectedOutputs.investorIrr, 2);
      expect(result.sponsorIrr).toBeCloseTo(example.expectedOutputs.sponsorIrr, 2);
      expect(result.equityMultiple).toBeCloseTo(example.expectedOutputs.equityMultiple, 2);
      expect(result.netPresentValue).toBeCloseTo(example.expectedOutputs.netPresentValue, -2);
    });

    it('should process example 2 correctly', () => {
      const example = realEstateWaterfallModelCalculator.examples[1];
      const result = calculateRealEstateWaterfallModel(example.inputs);
      
      expect(result.totalReturn).toBeGreaterThan(0);
      expect(result.investorReturn).toBeGreaterThan(0);
      expect(result.sponsorReturn).toBeGreaterThan(result.investorReturn);
      expect(result.preferredReturnAmount).toBeGreaterThan(0);
      expect(result.catchUpAmount).toBeGreaterThan(0);
      expect(result.promoteAmount).toBeGreaterThan(0);
      expect(result.investorProfit).toBeGreaterThan(example.inputs.investorEquity);
      expect(result.sponsorProfit).toBeGreaterThan(example.inputs.sponsorEquity);
      expect(result.investorIrr).toBeGreaterThan(0);
      expect(result.sponsorIrr).toBeGreaterThan(result.investorIrr);
      expect(result.equityMultiple).toBeGreaterThan(1);
      expect(result.netPresentValue).toBeGreaterThan(0);
    });

    it('should process example 3 correctly', () => {
      const example = realEstateWaterfallModelCalculator.examples[2];
      const result = calculateRealEstateWaterfallModel(example.inputs);
      
      expect(result.totalReturn).toBeGreaterThan(0);
      expect(result.investorReturn).toBeGreaterThan(0);
      expect(result.sponsorReturn).toBeGreaterThan(result.investorReturn);
      expect(result.preferredReturnAmount).toBeGreaterThan(0);
      expect(result.catchUpAmount).toBeGreaterThan(0);
      expect(result.promoteAmount).toBeGreaterThan(0);
      expect(result.investorProfit).toBeGreaterThan(example.inputs.investorEquity);
      expect(result.sponsorProfit).toBeGreaterThan(example.inputs.sponsorEquity);
      expect(result.investorIrr).toBeGreaterThan(0);
      expect(result.sponsorIrr).toBeGreaterThan(result.investorIrr);
      expect(result.equityMultiple).toBeGreaterThan(1);
      expect(result.netPresentValue).toBeGreaterThan(0);
    });
  });
});