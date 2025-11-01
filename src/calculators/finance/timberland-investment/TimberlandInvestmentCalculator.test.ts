import { describe, it, expect, beforeEach } from 'vitest';
import { TimberlandInvestmentCalculator } from './TimberlandInvestmentCalculator';
import { calculateTimberlandInvestment, generateTimberlandInvestmentAnalysis } from './formulas';
import { validateTimberlandInvestmentInputs } from './validation';
import { validateAllTimberlandInvestmentInputs } from './quickValidation';

describe('TimberlandInvestmentCalculator', () => {
  let validInputs: any;

  beforeEach(() => {
    validInputs = {
      propertySize: 1000,
      purchasePrice: 2500000,
      downPayment: 500000,
      interestRate: 5.5,
      loanTerm: 20,
      timberType: 'pine',
      currentStandAge: 15,
      rotationAge: 25,
      currentVolume: 5000,
      matureVolume: 15000,
      timberPrice: 0.25,
      priceGrowthRate: 2.0,
      volumeGrowthRate: 1.5,
      harvestCosts: 150,
      replantingCosts: 300,
      annualExpenses: 50,
      propertyTaxes: 2500,
      insurance: 1500,
      managementFee: 5,
      appreciationRate: 3.0,
      analysisPeriod: 20,
      harvestSchedule: 'clear-cut',
      thinningVolume: 2000,
      thinningAge: 10,
      thinningPrice: 0.15
    };
  });

  describe('Calculator Structure', () => {
    it('should have correct metadata', () => {
      expect(TimberlandInvestmentCalculator.name).toBe('Timberland Investment Calculator');
      expect(TimberlandInvestmentCalculator.category).toBe('finance');
      expect(TimberlandInvestmentCalculator.description).toContain('timberland');
    });

    it('should have all required input fields', () => {
      const inputFields = TimberlandInvestmentCalculator.inputs;
      expect(inputFields).toBeDefined();
      expect(inputFields.propertySize).toBeDefined();
      expect(inputFields.purchasePrice).toBeDefined();
      expect(inputFields.downPayment).toBeDefined();
      expect(inputFields.interestRate).toBeDefined();
      expect(inputFields.loanTerm).toBeDefined();
      expect(inputFields.timberType).toBeDefined();
      expect(inputFields.currentStandAge).toBeDefined();
      expect(inputFields.rotationAge).toBeDefined();
      expect(inputFields.currentVolume).toBeDefined();
      expect(inputFields.matureVolume).toBeDefined();
      expect(inputFields.timberPrice).toBeDefined();
      expect(inputFields.priceGrowthRate).toBeDefined();
      expect(inputFields.volumeGrowthRate).toBeDefined();
      expect(inputFields.harvestCosts).toBeDefined();
      expect(inputFields.replantingCosts).toBeDefined();
      expect(inputFields.annualExpenses).toBeDefined();
      expect(inputFields.propertyTaxes).toBeDefined();
      expect(inputFields.insurance).toBeDefined();
      expect(inputFields.managementFee).toBeDefined();
      expect(inputFields.appreciationRate).toBeDefined();
      expect(inputFields.analysisPeriod).toBeDefined();
      expect(inputFields.harvestSchedule).toBeDefined();
      expect(inputFields.thinningVolume).toBeDefined();
      expect(inputFields.thinningAge).toBeDefined();
      expect(inputFields.thinningPrice).toBeDefined();
    });

    it('should have all required output fields', () => {
      const outputFields = TimberlandInvestmentCalculator.outputs;
      expect(outputFields).toBeDefined();
      expect(outputFields.monthlyPayment).toBeDefined();
      expect(outputFields.annualOperatingIncome).toBeDefined();
      expect(outputFields.annualCashFlow).toBeDefined();
      expect(outputFields.cashOnCashReturn).toBeDefined();
      expect(outputFields.totalROI).toBeDefined();
      expect(outputFields.internalRateOfReturn).toBeDefined();
      expect(outputFields.netPresentValue).toBeDefined();
      expect(outputFields.paybackPeriod).toBeDefined();
      expect(outputFields.harvestRevenue).toBeDefined();
      expect(outputFields.landValue).toBeDefined();
      expect(outputFields.totalReturn).toBeDefined();
      expect(outputFields.annualizedReturn).toBeDefined();
      expect(outputFields.debtServiceCoverage).toBeDefined();
      expect(outputFields.profitabilityScore).toBeDefined();
      expect(outputFields.investmentScore).toBeDefined();
      expect(outputFields.riskScore).toBeDefined();
      expect(outputFields.valueScore).toBeDefined();
      expect(outputFields.nextHarvestYear).toBeDefined();
      expect(outputFields.harvestSchedule).toBeDefined();
      expect(outputFields.recommendation).toBeDefined();
    });

    it('should have calculation and report generation functions', () => {
      expect(TimberlandInvestmentCalculator.calculate).toBe(calculateTimberlandInvestment);
      expect(TimberlandInvestmentCalculator.generateReport).toBe(generateTimberlandInvestmentAnalysis);
    });
  });

  describe('Input Validation', () => {
    it('should validate correct inputs', () => {
      const result = validateTimberlandInvestmentInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete invalidInputs.propertySize;
      
      const result = validateTimberlandInvestmentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property size must be a valid number');
    });

    it('should detect OutOfRange values', () => {
      const invalidInputs = { ...validInputs, propertySize: -100 };
      
      const result = validateTimberlandInvestmentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property size must be greater than 0');
    });

    it('should detect logical errors', () => {
      const invalidInputs = { ...validInputs, downPayment: 3000000 };
      
      const result = validateTimberlandInvestmentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Down payment must be less than purchase price');
    });

    it('should provide warnings for unusual values', () => {
      const warningInputs = { ...validInputs, interestRate: 30 };
      
      const result = validateTimberlandInvestmentInputs(warningInputs);
      expect(result.isValid).toBe(true);
      expect(result.warnings).toContain('Interest rate is very high. Verify the value is correct');
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const result = validateAllTimberlandInvestmentInputs(validInputs);
      expect(result.isValid).toBe(true);
    });

    it('should handle invalid property size', () => {
      const invalidInputs = { ...validInputs, propertySize: -100 };
      const result = validateAllTimberlandInvestmentInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('Property size must be greater than 0');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic financial metrics correctly', () => {
      const outputs = calculateTimberlandInvestment(validInputs);
      
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
      expect(outputs.annualCashFlow).toBeDefined();
      expect(outputs.cashOnCashReturn).toBeDefined();
      expect(outputs.totalROI).toBeDefined();
      expect(outputs.internalRateOfReturn).toBeDefined();
      expect(outputs.netPresentValue).toBeDefined();
      expect(outputs.paybackPeriod).toBeDefined();
    });

    it('should calculate harvest schedule correctly', () => {
      const outputs = calculateTimberlandInvestment(validInputs);
      
      expect(outputs.harvestSchedule).toBeDefined();
      expect(Array.isArray(outputs.harvestSchedule)).toBe(true);
      expect(outputs.nextHarvestYear).toBeGreaterThanOrEqual(0);
    });

    it('should calculate scoring metrics', () => {
      const outputs = calculateTimberlandInvestment(validInputs);
      
      expect(outputs.profitabilityScore).toBeGreaterThanOrEqual(0);
      expect(outputs.profitabilityScore).toBeLessThanOrEqual(100);
      expect(outputs.investmentScore).toBeGreaterThanOrEqual(0);
      expect(outputs.investmentScore).toBeLessThanOrEqual(100);
      expect(outputs.riskScore).toBeGreaterThanOrEqual(0);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
      expect(outputs.valueScore).toBeGreaterThanOrEqual(0);
      expect(outputs.valueScore).toBeLessThanOrEqual(100);
    });

    it('should generate recommendations', () => {
      const outputs = calculateTimberlandInvestment(validInputs);
      
      expect(outputs.recommendation).toBeDefined();
      expect(typeof outputs.recommendation).toBe('string');
      expect(outputs.recommendation.length).toBeGreaterThan(0);
    });

    it('should handle different timber types', () => {
      const pineInputs = { ...validInputs, timberType: 'pine' };
      const oakInputs = { ...validInputs, timberType: 'oak' };
      
      const pineOutputs = calculateTimberlandInvestment(pineInputs);
      const oakOutputs = calculateTimberlandInvestment(oakInputs);
      
      expect(pineOutputs.totalROI).not.toBe(oakOutputs.totalROI);
    });

    it('should handle different harvest schedules', () => {
      const clearCutInputs = { ...validInputs, harvestSchedule: 'clear-cut' };
      const selectiveInputs = { ...validInputs, harvestSchedule: 'selective' };
      
      const clearCutOutputs = calculateTimberlandInvestment(clearCutInputs);
      const selectiveOutputs = calculateTimberlandInvestment(selectiveInputs);
      
      expect(clearCutOutputs.harvestRevenue).not.toBe(selectiveOutputs.harvestRevenue);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero values appropriately', () => {
      const zeroInputs = { ...validInputs, currentVolume: 0 };
      const outputs = calculateTimberlandInvestment(zeroInputs);
      
      expect(outputs).toBeDefined();
      expect(outputs.harvestRevenue).toBeGreaterThanOrEqual(0);
    });

    it('should handle very large property sizes', () => {
      const largeInputs = { ...validInputs, propertySize: 50000 };
      const outputs = calculateTimberlandInvestment(largeInputs);
      
      expect(outputs).toBeDefined();
      expect(outputs.harvestRevenue).toBeGreaterThan(0);
    });

    it('should handle very high timber prices', () => {
      const highPriceInputs = { ...validInputs, timberPrice: 3.0 };
      const outputs = calculateTimberlandInvestment(highPriceInputs);
      
      expect(outputs).toBeDefined();
      expect(outputs.totalROI).toBeGreaterThan(0);
    });

    it('should handle mature stands', () => {
      const matureInputs = { ...validInputs, currentStandAge: 24, rotationAge: 25 };
      const outputs = calculateTimberlandInvestment(matureInputs);
      
      expect(outputs).toBeDefined();
      expect(outputs.nextHarvestYear).toBeLessThanOrEqual(2);
    });
  });

  describe('Report Generation', () => {
    it('should generate a comprehensive analysis report', () => {
      const outputs = calculateTimberlandInvestment(validInputs);
      const report = generateTimberlandInvestmentAnalysis(validInputs, outputs);
      
      expect(report).toContain('Timberland Investment Analysis');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Financial Performance');
      expect(report).toContain('Harvest Schedule');
      expect(report).toContain('Property Details');
      expect(report).toContain('Financial Terms');
      expect(report).toContain('Market Assumptions');
      expect(report).toContain('Assessment Scores');
      expect(report).toContain('Recommendations');
      expect(report).toContain('Investment Decision');
    });

    it('should include all key metrics in the report', () => {
      const outputs = calculateTimberlandInvestment(validInputs);
      const report = generateTimberlandInvestmentAnalysis(validInputs, outputs);
      
      expect(report).toContain(outputs.cashOnCashReturn.toString());
      expect(report).toContain(outputs.totalROI.toString());
      expect(report).toContain(outputs.internalRateOfReturn.toString());
      expect(report).toContain(outputs.debtServiceCoverage.toString());
      expect(report).toContain(outputs.nextHarvestYear.toString());
    });

    it('should include harvest schedule table', () => {
      const outputs = calculateTimberlandInvestment(validInputs);
      const report = generateTimberlandInvestmentAnalysis(validInputs, outputs);
      
      expect(report).toContain('| Year | Type | Volume');
      expect(report).toContain('|------|------|');
    });

    it('should include property and financial details', () => {
      const outputs = calculateTimberlandInvestment(validInputs);
      const report = generateTimberlandInvestmentAnalysis(validInputs, outputs);
      
      expect(report).toContain(validInputs.propertySize.toString());
      expect(report).toContain(validInputs.timberType);
      expect(report).toContain(validInputs.purchasePrice.toString());
      expect(report).toContain(validInputs.interestRate.toString());
    });
  });

  describe('Integration Tests', () => {
    it('should work with the complete calculator flow', () => {
      // Test the complete flow from inputs to outputs
      const validation = validateTimberlandInvestmentInputs(validInputs);
      expect(validation.isValid).toBe(true);
      
      const outputs = calculateTimberlandInvestment(validInputs);
      expect(outputs).toBeDefined();
      
      const report = generateTimberlandInvestmentAnalysis(validInputs, outputs);
      expect(report).toBeDefined();
    });

    it('should handle realistic timberland investment scenarios', () => {
      const realisticInputs = {
        propertySize: 500,
        purchasePrice: 1500000,
        downPayment: 300000,
        interestRate: 4.5,
        loanTerm: 25,
        timberType: 'oak',
        currentStandAge: 20,
        rotationAge: 40,
        currentVolume: 8000,
        matureVolume: 20000,
        timberPrice: 0.35,
        priceGrowthRate: 1.5,
        volumeGrowthRate: 1.0,
        harvestCosts: 200,
        replantingCosts: 400,
        annualExpenses: 75,
        propertyTaxes: 1500,
        insurance: 1000,
        managementFee: 3,
        appreciationRate: 2.5,
        analysisPeriod: 25,
        harvestSchedule: 'thinning',
        thinningVolume: 3000,
        thinningAge: 15,
        thinningPrice: 0.20
      };
      
      const outputs = calculateTimberlandInvestment(realisticInputs);
      
      expect(outputs.cashOnCashReturn).toBeGreaterThan(-50);
      expect(outputs.cashOnCashReturn).toBeLessThan(50);
      expect(outputs.totalROI).toBeGreaterThan(0);
      expect(outputs.totalROI).toBeLessThan(500);
      expect(outputs.internalRateOfReturn).toBeGreaterThan(0);
      expect(outputs.internalRateOfReturn).toBeLessThan(1);
    });
  });
});
