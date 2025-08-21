import { describe, it, expect } from 'vitest';
import { VineyardProfitabilityCalculator } from './VineyardProfitabilityCalculator';
import { calculateVineyardProfitability, generateVineyardProfitabilityAnalysis } from './formulas';
import { validateVineyardProfitabilityInputs } from './validation';
import { validateAllVineyardProfitabilityInputs } from './quickValidation';

describe('VineyardProfitabilityCalculator', () => {
  const validInputs = {
    acreage: 10,
    vineType: 'premium',
    plantingCosts: 15000,
    annualOperatingCosts: 3000,
    yieldPerAcre: 4,
    pricePerTon: 2000,
    establishmentPeriod: 4,
    productionLifespan: 25,
    discountRate: 8,
    laborCosts: 25000,
    equipmentCosts: 50000,
    irrigationCosts: 30000,
    pestControlCosts: 5000,
    harvestingCosts: 15000,
    marketingCosts: 8000,
    insuranceCosts: 3000,
    taxRate: 25,
    landValue: 500000,
    replantingCosts: 75000
  };

  describe('Calculator Structure', () => {
    it('should have correct calculator properties', () => {
      expect(VineyardProfitabilityCalculator.id).toBe('vineyard-profitability');
      expect(VineyardProfitabilityCalculator.title).toBe('Vineyard Profitability Calculator');
      expect(VineyardProfitabilityCalculator.category).toBe('finance');
      expect(VineyardProfitabilityCalculator.description).toContain('vineyard');
    });

    it('should have all required inputs', () => {
      const requiredInputs = [
        'acreage', 'vineType', 'plantingCosts', 'annualOperatingCosts',
        'yieldPerAcre', 'pricePerTon', 'establishmentPeriod', 'productionLifespan',
        'discountRate', 'laborCosts', 'equipmentCosts', 'irrigationCosts',
        'pestControlCosts', 'harvestingCosts', 'marketingCosts', 'insuranceCosts',
        'taxRate', 'landValue', 'replantingCosts'
      ];

      const inputIds = Object.keys(VineyardProfitabilityCalculator.inputs);
      requiredInputs.forEach(input => {
        expect(inputIds).toContain(input);
      });
    });

    it('should have all required outputs', () => {
      const requiredOutputs = [
        'totalEstablishmentCosts', 'establishmentCostPerAcre', 'totalAnnualCosts',
        'annualCostPerAcre', 'annualRevenue', 'revenuePerAcre', 'annualNetIncome',
        'annualNetIncomeAfterTax', 'netIncomePerAcre', 'npv', 'irr', 'paybackPeriod',
        'profitMargin', 'returnOnInvestment', 'costOfProduction', 'breakEvenPrice',
        'breakEvenYield', 'breakEvenAcreage', 'priceVariation10Percent',
        'yieldVariation10Percent', 'costVariation10Percent', 'riskScore',
        'recommendedInsurance'
      ];

      const outputIds = Object.keys(VineyardProfitabilityCalculator.outputs);
      requiredOutputs.forEach(output => {
        expect(outputIds).toContain(output);
      });
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const result = validateVineyardProfitabilityInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('should reject invalid acreage', () => {
      const invalidInputs = { ...validInputs, acreage: -1 };
      const result = validateVineyardProfitabilityInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.acreage).toBeDefined();
    });

    it('should reject invalid vine type', () => {
      const invalidInputs = { ...validInputs, vineType: 'invalid' };
      const result = validateVineyardProfitabilityInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.vineType).toBeDefined();
    });

    it('should reject zero planting costs', () => {
      const invalidInputs = { ...validInputs, plantingCosts: 0 };
      const result = validateVineyardProfitabilityInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.plantingCosts).toBeDefined();
    });

    it('should reject zero yield per acre', () => {
      const invalidInputs = { ...validInputs, yieldPerAcre: 0 };
      const result = validateVineyardProfitabilityInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.yieldPerAcre).toBeDefined();
    });

    it('should reject negative discount rate', () => {
      const invalidInputs = { ...validInputs, discountRate: -5 };
      const result = validateVineyardProfitabilityInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.discountRate).toBeDefined();
    });
  });

  describe('Quick Validation', () => {
    it('should validate all inputs correctly', () => {
      const result = validateAllVineyardProfitabilityInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('should detect cross-field validation errors', () => {
      const invalidInputs = {
        ...validInputs,
        plantingCosts: 100000, // Very high planting costs
        yieldPerAcre: 1, // Very low yield
        pricePerTon: 500 // Low price
      };
      const result = validateAllVineyardProfitabilityInputs(invalidInputs);
      expect(result.isValid).toBe(false);
    });
  });

  describe('Calculations', () => {
    it('should calculate establishment costs correctly', () => {
      const result = calculateVineyardProfitability(validInputs);
      
      // Total establishment costs = acreage * plantingCosts + irrigationCosts + equipmentCosts
      const expectedEstablishmentCosts = 10 * 15000 + 30000 + 50000; // 230000
      expect(result.totalEstablishmentCosts).toBe(expectedEstablishmentCosts);
      expect(result.establishmentCostPerAcre).toBe(expectedEstablishmentCosts / 10);
    });

    it('should calculate annual revenue correctly', () => {
      const result = calculateVineyardProfitability(validInputs);
      
      // Premium vine type gets 1.25 multiplier
      // Revenue = acreage * yieldPerAcre * pricePerTon * multiplier
      const expectedRevenue = 10 * 4 * 2000 * 1.25; // 100000
      expect(result.annualRevenue).toBe(expectedRevenue);
      expect(result.revenuePerAcre).toBe(expectedRevenue / 10);
    });

    it('should calculate annual costs correctly', () => {
      const result = calculateVineyardProfitability(validInputs);
      
      // Total annual costs = acreage * annualOperatingCosts + all other annual costs
      const expectedCosts = 10 * 3000 + 25000 + 5000 + 15000 + 8000 + 3000; // 86000
      expect(result.totalAnnualCosts).toBe(expectedCosts);
      expect(result.annualCostPerAcre).toBe(expectedCosts / 10);
    });

    it('should calculate profitability metrics', () => {
      const result = calculateVineyardProfitability(validInputs);
      
      expect(result.annualNetIncome).toBeGreaterThan(0);
      expect(result.annualNetIncomeAfterTax).toBeLessThan(result.annualNetIncome);
      expect(result.profitMargin).toBeGreaterThan(0);
      expect(result.returnOnInvestment).toBeDefined();
    });

    it('should calculate NPV and IRR', () => {
      const result = calculateVineyardProfitability(validInputs);
      
      expect(result.npv).toBeDefined();
      expect(result.irr).toBeDefined();
      expect(result.paybackPeriod).toBeGreaterThan(0);
    });

    it('should calculate break-even analysis', () => {
      const result = calculateVineyardProfitability(validInputs);
      
      expect(result.breakEvenPrice).toBeGreaterThan(0);
      expect(result.breakEvenYield).toBeGreaterThan(0);
      expect(result.breakEvenAcreage).toBeGreaterThan(0);
    });

    it('should calculate sensitivity analysis', () => {
      const result = calculateVineyardProfitability(validInputs);
      
      expect(result.priceVariation10Percent).toBeDefined();
      expect(result.yieldVariation10Percent).toBeDefined();
      expect(result.costVariation10Percent).toBeDefined();
    });

    it('should calculate risk metrics', () => {
      const result = calculateVineyardProfitability(validInputs);
      
      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(5);
      expect(result.recommendedInsurance).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum viable vineyard', () => {
      const minInputs = {
        ...validInputs,
        acreage: 1,
        yieldPerAcre: 2,
        pricePerTon: 1000,
        vineType: 'standard'
      };
      
      const result = calculateVineyardProfitability(minInputs);
      expect(result.annualRevenue).toBe(1 * 2 * 1000 * 1.0); // 2000
      expect(result.totalEstablishmentCosts).toBeGreaterThan(0);
    });

    it('should handle large commercial vineyard', () => {
      const largeInputs = {
        ...validInputs,
        acreage: 500,
        yieldPerAcre: 6,
        pricePerTon: 3000
      };
      
      const result = calculateVineyardProfitability(largeInputs);
      expect(result.annualRevenue).toBeGreaterThan(1000000);
      expect(result.totalEstablishmentCosts).toBeGreaterThan(1000000);
    });

    it('should handle organic vineyard premium', () => {
      const organicInputs = {
        ...validInputs,
        vineType: 'organic'
      };
      
      const result = calculateVineyardProfitability(organicInputs);
      const standardResult = calculateVineyardProfitability({
        ...validInputs,
        vineType: 'standard'
      });
      
      expect(result.annualRevenue).toBeGreaterThan(standardResult.annualRevenue);
    });

    it('should handle zero optional costs', () => {
      const minimalInputs = {
        ...validInputs,
        laborCosts: 0,
        equipmentCosts: 0,
        irrigationCosts: 0,
        pestControlCosts: 0,
        harvestingCosts: 0,
        marketingCosts: 0,
        insuranceCosts: 0,
        replantingCosts: 0,
        landValue: 0
      };
      
      const result = calculateVineyardProfitability(minimalInputs);
      expect(result.totalEstablishmentCosts).toBe(validInputs.acreage * validInputs.plantingCosts);
      expect(result.totalAnnualCosts).toBe(validInputs.acreage * validInputs.annualOperatingCosts);
    });

    it('should handle very high discount rate', () => {
      const highDiscountInputs = {
        ...validInputs,
        discountRate: 25
      };
      
      const result = calculateVineyardProfitability(highDiscountInputs);
      const normalResult = calculateVineyardProfitability(validInputs);
      
      expect(result.npv).toBeLessThan(normalResult.npv);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const result = calculateVineyardProfitability(validInputs);
      const report = generateVineyardProfitabilityAnalysis(validInputs, result);
      
      expect(report).toContain('Vineyard Profitability Analysis Report');
      expect(report).toContain('Executive Summary');
      expect(report).toContain('Key Financial Metrics');
      expect(report).toContain('Investment Overview');
      expect(report).toContain('Revenue Analysis');
      expect(report).toContain('Break-Even Analysis');
      expect(report).toContain('Risk Assessment');
      expect(report).toContain('Sensitivity Analysis');
      expect(report).toContain('Investment Recommendation');
      expect(report).toContain('Key Success Factors');
    });

    it('should include all key metrics in report', () => {
      const result = calculateVineyardProfitability(validInputs);
      const report = generateVineyardProfitabilityAnalysis(validInputs, result);
      
      expect(report).toContain(result.npv?.toLocaleString());
      expect(report).toContain(result.irr?.toFixed(1));
      expect(report).toContain(result.paybackPeriod?.toFixed(1));
      expect(report).toContain(result.profitMargin?.toFixed(1));
    });

    it('should provide investment recommendation', () => {
      const result = calculateVineyardProfitability(validInputs);
      const report = generateVineyardProfitabilityAnalysis(validInputs, result);
      
      expect(report).toMatch(/(STRONG BUY|MODERATE BUY|CAUTIOUS CONSIDERATION|NOT RECOMMENDED)/);
    });
  });

  describe('Calculator Interface', () => {
    it('should implement calculate method', () => {
      expect(typeof VineyardProfitabilityCalculator.calculate).toBe('function');
      
      const result = VineyardProfitabilityCalculator.calculate(validInputs);
      expect(result).toBeDefined();
      expect(result.totalEstablishmentCosts).toBeDefined();
      expect(result.annualRevenue).toBeDefined();
      expect(result.npv).toBeDefined();
    });

    it('should implement generateReport method', () => {
      expect(typeof VineyardProfitabilityCalculator.generateReport).toBe('function');
      
      const result = VineyardProfitabilityCalculator.calculate(validInputs);
      const report = VineyardProfitabilityCalculator.generateReport(validInputs, result);
      
      expect(typeof report).toBe('string');
      expect(report.length).toBeGreaterThan(100);
    });
  });
});
