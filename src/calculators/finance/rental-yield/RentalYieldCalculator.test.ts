import { describe, it, expect } from 'vitest';
import { RentalYieldCalculator } from './RentalYieldCalculator';
import { validateRentalYieldInputs } from './validation';
import { validateAllRentalYieldInputs } from './quickValidation';
import { calculateRentalYield, generateRentalYieldAnalysis } from './formulas';
import { CalculatorInputs, CalculatorOutputs } from '../../types/calculator';

describe('RentalYieldCalculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(RentalYieldCalculator.id).toBe('RentalYieldCalculator');
      expect(RentalYieldCalculator.name).toBe('Rental Yield Calculator');
      expect(RentalYieldCalculator.category).toBe('finance');
      expect(RentalYieldCalculator.subcategory).toBe('real-estate');
    });

    it('should have required inputs', () => {
      const requiredInputs = [
        'propertyValue', 'monthlyRent'
      ];
      
      requiredInputs.forEach(inputId => {
        const input = RentalYieldCalculator.inputs.find(i => i.id === inputId);
        expect(input).toBeDefined();
        expect(input?.required).toBe(true);
      });
    });

    it('should have required outputs', () => {
      const requiredOutputs = [
        'grossYield', 'netYield', 'cashOnCashReturn', 'totalInvestment',
        'yieldScore', 'recommendation'
      ];
      
      requiredOutputs.forEach(outputId => {
        const output = RentalYieldCalculator.outputs.find(o => o.id === outputId);
        expect(output).toBeDefined();
      });
    });

    it('should have calculation and report generation functions', () => {
      expect(typeof RentalYieldCalculator.calculate).toBe('function');
      expect(typeof RentalYieldCalculator.generateReport).toBe('function');
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const inputs: CalculatorInputs = {};
      const result = validateRentalYieldInputs(inputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value is required and must be greater than 0');
      expect(result.errors).toContain('Monthly rent is required and must be greater than 0');
    });

    it('should validate property value ranges', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 15000000, // Invalid: too high
        monthlyRent: 2500
      };
      
      const result = validateRentalYieldInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be between $0 and $10,000,000');
    });

    it('should validate monthly rent ranges', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 300000,
        monthlyRent: 60000 // Invalid: too high
      };
      
      const result = validateRentalYieldInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Monthly rent must be between $0 and $50,000');
    });

    it('should validate enum values', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 300000,
        monthlyRent: 2500,
        propertyType: 'invalid-type', // Invalid enum
        location: 'invalid-location', // Invalid enum
        marketConditions: 'invalid-conditions', // Invalid enum
        analysisPeriod: 'invalid-period' // Invalid enum
      };
      
      const result = validateRentalYieldInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property type must be one of: single-family, condo, townhouse, duplex, triplex, fourplex, apartment, commercial');
      expect(result.errors).toContain('Location must be one of: urban, suburban, rural');
      expect(result.errors).toContain('Market conditions must be one of: hot, stable, cooling, declining');
      expect(result.errors).toContain('Analysis period must be one of: monthly, quarterly, annually, 5-year, 10-year');
    });

    it('should provide warnings for logical issues', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 300000,
        monthlyRent: 1000, // Low rent relative to price
        vacancyRate: 15, // High vacancy
        appreciationRate: -5 // Negative appreciation
      };
      
      const result = validateRentalYieldInputs(inputs);
      expect(result.warnings).toContain('RentToPrice ratio is low - may indicate poor yield');
      expect(result.warnings).toContain('High vacancy rate may indicate market issues');
      expect(result.warnings).toContain('Negative appreciation rate indicates declining market');
    });

    it('should accept valid inputs', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 300000,
        monthlyRent: 2500,
        propertyType: 'single-family',
        location: 'suburban',
        marketConditions: 'stable',
        analysisPeriod: 'annually'
      };
      
      const result = validateRentalYieldInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields', () => {
      const { validatePropertyValue, validateMonthlyRent } = require('./quickValidation');
      
      expect(validatePropertyValue(0)).toBe('Property value must be greater than 0');
      expect(validatePropertyValue(300000)).toBeNull();
      
      expect(validateMonthlyRent(0)).toBe('Monthly rent must be greater than 0');
      expect(validateMonthlyRent(2500)).toBeNull();
    });

    it('should validate all inputs', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 300000,
        monthlyRent: 2500
      };
      
      const result = validateAllRentalYieldInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic rental yield metrics', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 300000,
        monthlyRent: 2500,
        vacancyRate: 5,
        propertyTaxes: 3600,
        insurance: 1800,
        maintenance: 200,
        propertyManagement: 8,
        appreciationRate: 3,
        holdingPeriod: 10,
        taxRate: 22
      };
      
      const outputs = calculateRentalYield(inputs);
      
      expect(outputs.grossYield).toBeGreaterThan(0);
      expect(outputs.netYield).toBeGreaterThan(0);
      expect(outputs.cashOnCashReturn).toBeDefined();
      expect(outputs.totalInvestment).toBe(0); // No down payment specified
      expect(outputs.monthlyCashFlow).toBeDefined();
      expect(outputs.annualCashFlow).toBe(outputs.monthlyCashFlow * 12);
      expect(outputs.yieldScore).toBeGreaterThanOrEqual(0);
      expect(outputs.yieldScore).toBeLessThanOrEqual(100);
      expect(outputs.riskScore).toBeGreaterThanOrEqual(0);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
      expect(outputs.cashFlowScore).toBeGreaterThanOrEqual(0);
      expect(outputs.cashFlowScore).toBeLessThanOrEqual(100);
      expect(outputs.marketScore).toBeGreaterThanOrEqual(0);
      expect(outputs.marketScore).toBeLessThanOrEqual(100);
    });

    it('should handle negative cash flow scenario', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 300000,
        monthlyRent: 1500, // Low rent
        propertyTaxes: 3600,
        insurance: 1800,
        maintenance: 500, // High maintenance
        propertyManagement: 10
      };
      
      const outputs = calculateRentalYield(inputs);
      
      expect(outputs.monthlyCashFlow).toBeLessThan(0);
      expect(outputs.cashOnCashReturn).toBeLessThan(0);
      expect(outputs.yieldScore).toBeLessThan(50);
    });

    it('should calculate yield metrics correctly', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 300000,
        monthlyRent: 2500,
        appreciationRate: 3,
        holdingPeriod: 10
      };
      
      const outputs = calculateRentalYield(inputs);
      
      // Gross yield should be (2500 * 12) / 300000 = 10%
      expect(outputs.grossYield).toBeCloseTo(10, 1);
      expect(outputs.netYield).toBeLessThan(outputs.grossYield);
      expect(outputs.capRate).toBeDefined();
      expect(outputs.totalROI).toBeDefined();
      expect(outputs.annualizedROI).toBeDefined();
      expect(outputs.paybackPeriod).toBeDefined();
      expect(outputs.internalRateOfReturn).toBeDefined();
      expect(outputs.netPresentValue).toBeDefined();
    });

    it('should calculate ratios correctly', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 300000,
        monthlyRent: 2500
      };
      
      const outputs = calculateRentalYield(inputs);
      
      expect(outputs.rentToPriceRatio).toBeCloseTo(0.1, 2); // 30000 / 300000
      expect(outputs.priceToRentRatio).toBeCloseTo(10, 1); // 300000 / 30000
      expect(outputs.operatingExpenseRatio).toBeDefined();
      expect(outputs.debtServiceCoverage).toBeDefined();
    });

    it('should generate appropriate recommendations', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 300000,
        monthlyRent: 2500,
        appreciationRate: 3,
        holdingPeriod: 10
      };
      
      const outputs = calculateRentalYield(inputs);
      
      expect(outputs.recommendation).toBeDefined();
      expect(typeof outputs.recommendation).toBe('string');
      expect(outputs.recommendation.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero property value', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 0,
        monthlyRent: 2500
      };
      
      const outputs = calculateRentalYield(inputs);
      expect(outputs.grossYield).toBe(0);
      expect(outputs.netYield).toBe(0);
    });

    it('should handle very high vacancy rates', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 300000,
        monthlyRent: 2500,
        vacancyRate: 40 // Very high vacancy
      };
      
      const outputs = calculateRentalYield(inputs);
      expect(outputs.riskScore).toBeGreaterThan(50);
    });

    it('should handle negative appreciation', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 300000,
        monthlyRent: 2500,
        appreciationRate: -5 // Negative appreciation
      };
      
      const outputs = calculateRentalYield(inputs);
      expect(outputs.marketScore).toBeLessThan(50);
    });

    it('should handle very short holding periods', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 300000,
        monthlyRent: 2500,
        holdingPeriod: 1 // Very short holding period
      };
      
      const outputs = calculateRentalYield(inputs);
      expect(outputs.riskScore).toBeGreaterThan(50);
    });

    it('should handle all optional expenses', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 300000,
        monthlyRent: 2500,
        propertyTaxes: 3600,
        insurance: 1800,
        hoaFees: 200,
        utilities: 150,
        maintenance: 200,
        propertyManagement: 8,
        repairs: 150,
        landscaping: 50,
        pestControl: 25,
        advertising: 30,
        legalFees: 500,
        accountingFees: 300
      };
      
      const outputs = calculateRentalYield(inputs);
      expect(outputs.totalAnnualExpenses).toBeGreaterThan(0);
      expect(outputs.operatingExpenseRatio).toBeGreaterThan(0);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 300000,
        monthlyRent: 2500,
        appreciationRate: 3,
        holdingPeriod: 10
      };
      
      const outputs = calculateRentalYield(inputs);
      const report = generateRentalYieldAnalysis(inputs, outputs);
      
      expect(report).toContain('Rental Yield Analysis Report');
      expect(report).toContain('Summary');
      expect(report).toContain('Yield Metrics');
      expect(report).toContain('Investment Overview');
      expect(report).toContain('Income Analysis');
      expect(report).toContain('Cash Flow Analysis');
      expect(report).toContain('Financial Ratios');
      expect(report).toContain('Investment Returns');
      expect(report).toContain('Key Strengths');
      expect(report).toContain('Key Risks');
      expect(report).toContain('Recommendations');
    });

    it('should include all calculated values in report', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 300000,
        monthlyRent: 2500,
        appreciationRate: 3,
        holdingPeriod: 10
      };
      
      const outputs = calculateRentalYield(inputs);
      const report = generateRentalYieldAnalysis(inputs, outputs);
      
      expect(report).toContain(outputs.recommendation);
      expect(report).toContain(outputs.yieldScore.toString());
      expect(report).toContain(outputs.monthlyCashFlow.toLocaleString());
      expect(report).toContain(outputs.annualCashFlow.toLocaleString());
      expect(report).toContain(outputs.grossYield.toString());
      expect(report).toContain(outputs.netYield.toString());
    });
  });

  describe('Integration', () => {
    it('should work with calculator interface', () => {
      const inputs: CalculatorInputs = {
        propertyValue: 300000,
        monthlyRent: 2500
      };
      
      const outputs = RentalYieldCalculator.calculate(inputs);
      const report = RentalYieldCalculator.generateReport(inputs, outputs);
      
      expect(outputs).toBeDefined();
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
    });
  });
});
