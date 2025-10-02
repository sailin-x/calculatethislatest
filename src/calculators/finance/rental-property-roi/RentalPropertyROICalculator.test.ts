import { describe, it, expect } from 'vitest';
import { RentalPropertyROICalculator } from './RentalPropertyROICalculator';
import { validateRentalPropertyROIInputs } from './validation';
import { validateAllRentalPropertyROIInputs } from './quickValidation';
import { calculateRentalPropertyROI, generateRentalPropertyAnalysis } from './formulas';
import { CalculatorInputs, CalculatorOutputs } from '../../types/calculator';

describe('RentalPropertyROICalculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(RentalPropertyROICalculator.id).toBe('rental-property-roi-calculator');
      expect(RentalPropertyROICalculator.name).toBe('Rental Property ROI Calculator');
      expect(RentalPropertyROICalculator.category).toBe('finance');
      expect(RentalPropertyROICalculator.subcategory).toBe('real-estate');
    });

    it('should have required inputs', () => {
      const requiredInputs = [
        'purchasePrice', 'downPayment', 'closingCosts', 'loanAmount', 
        'interestRate', 'loanTerm', 'monthlyRent'
      ];
      
      requiredInputs.forEach(inputId => {
        const input = RentalPropertyROICalculator.inputs.find(i => i.id === inputId);
        expect(input).toBeDefined();
        expect(input?.required).toBe(true);
      });
    });

    it('should have required outputs', () => {
      const requiredOutputs = [
        'totalInvestment', 'monthlyCashFlow', 'annualCashFlow', 'cashOnCashReturn',
        'investmentScore', 'recommendation'
      ];
      
      requiredOutputs.forEach(outputId => {
        const output = RentalPropertyROICalculator.outputs.find(o => o.id === outputId);
        expect(output).toBeDefined();
      });
    });

    it('should have calculation and report generation functions', () => {
      expect(typeof RentalPropertyROICalculator.calculate).toBe('function');
      expect(typeof RentalPropertyROICalculator.generateReport).toBe('function');
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const inputs: CalculatorInputs = {};
      const result = validateRentalPropertyROIInputs(inputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Purchase price is required and must be greater than 0');
      expect(result.errors).toContain('Down payment is required and must be greater than 0');
      expect(result.errors).toContain('Closing costs are required and must be non-negative');
      expect(result.errors).toContain('Loan amount is required and must be greater than 0');
      expect(result.errors).toContain('Interest rate is required and must be non-negative');
      expect(result.errors).toContain('Loan term is required and must be greater than 0');
      expect(result.errors).toContain('Monthly rent is required and must be greater than 0');
    });

    it('should validate purchase price ranges', () => {
      const inputs: CalculatorInputs = {
        purchasePrice: 15000000, // Invalid: too high
        downPayment: 60000,
        closingCosts: 9000,
        loanAmount: 240000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500
      };
      
      const result = validateRentalPropertyROIInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Purchase price must be between $0 and $10,000,000');
    });

    it('should validate interest rate ranges', () => {
      const inputs: CalculatorInputs = {
        purchasePrice: 300000,
        downPayment: 60000,
        closingCosts: 9000,
        loanAmount: 240000,
        interestRate: 25, // Invalid: too high
        loanTerm: 30,
        monthlyRent: 2500
      };
      
      const result = validateRentalPropertyROIInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Interest rate must be between 0% and 20%');
    });

    it('should validate loan term ranges', () => {
      const inputs: CalculatorInputs = {
        purchasePrice: 300000,
        downPayment: 60000,
        closingCosts: 9000,
        loanAmount: 240000,
        interestRate: 6.5,
        loanTerm: 60, // Invalid: too high
        monthlyRent: 2500
      };
      
      const result = validateRentalPropertyROIInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan term must be between 1 and 50 years');
    });

    it('should validate monthly rent ranges', () => {
      const inputs: CalculatorInputs = {
        purchasePrice: 300000,
        downPayment: 60000,
        closingCosts: 9000,
        loanAmount: 240000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 60000 // Invalid: too high
      };
      
      const result = validateRentalPropertyROIInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Monthly rent must be between $0 and $50,000');
    });

    it('should validate enum values', () => {
      const inputs: CalculatorInputs = {
        purchasePrice: 300000,
        downPayment: 60000,
        closingCosts: 9000,
        loanAmount: 240000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        loanType: 'invalid-type', // Invalid enum
        propertyType: 'invalid-type', // Invalid enum
        location: 'invalid-location', // Invalid enum
        marketConditions: 'invalid-conditions', // Invalid enum
        exitStrategy: 'invalid-strategy' // Invalid enum
      };
      
      const result = validateRentalPropertyROIInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loan type must be one of: conventional, fha, va, usda');
      expect(result.errors).toContain('Property type must be one of: single-family, condo, townhouse, duplex, triplex, fourplex, apartment, commercial');
      expect(result.errors).toContain('Location must be one of: urban, suburban, rural');
      expect(result.errors).toContain('Market conditions must be one of: hot, stable, cooling, declining');
      expect(result.errors).toContain('Exit strategy must be one of: sell, refinance, 1031-exchange, hold-long-term');
    });

    it('should provide warnings for logical issues', () => {
      const inputs: CalculatorInputs = {
        purchasePrice: 300000,
        downPayment: 60000,
        closingCosts: 9000,
        loanAmount: 240000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 1000, // Low rent relative to price
        vacancyRate: 15, // High vacancy
        appreciationRate: -5 // Negative appreciation
      };
      
      const result = validateRentalPropertyROIInputs(inputs);
      expect(result.warnings).toContain('Rent-to-price ratio is low - may indicate poor cash flow');
      expect(result.warnings).toContain('High vacancy rate may indicate market issues');
      expect(result.warnings).toContain('Negative appreciation rate indicates declining market');
    });

    it('should accept valid inputs', () => {
      const inputs: CalculatorInputs = {
        purchasePrice: 300000,
        downPayment: 60000,
        closingCosts: 9000,
        loanAmount: 240000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        loanType: 'conventional',
        propertyType: 'single-family',
        location: 'suburban',
        marketConditions: 'stable',
        exitStrategy: 'sell'
      };
      
      const result = validateRentalPropertyROIInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields', () => {
      const { validatePurchasePrice, validateMonthlyRent } = require('./quickValidation');
      
      expect(validatePurchasePrice(0)).toBe('Purchase price must be greater than 0');
      expect(validatePurchasePrice(300000)).toBeNull();
      
      expect(validateMonthlyRent(0)).toBe('Monthly rent must be greater than 0');
      expect(validateMonthlyRent(2500)).toBeNull();
    });

    it('should validate all inputs', () => {
      const inputs: CalculatorInputs = {
        purchasePrice: 300000,
        downPayment: 60000,
        closingCosts: 9000,
        loanAmount: 240000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500
      };
      
      const result = validateAllRentalPropertyROIInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic rental property metrics', () => {
      const inputs: CalculatorInputs = {
        purchasePrice: 300000,
        downPayment: 60000,
        closingCosts: 9000,
        loanAmount: 240000,
        interestRate: 6.5,
        loanTerm: 30,
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
      
      const outputs = calculateRentalPropertyROI(inputs);
      
      expect(outputs.totalInvestment).toBe(69000); // downPayment + closingCosts
      expect(outputs.monthlyCashFlow).toBeDefined();
      expect(outputs.annualCashFlow).toBe(outputs.monthlyCashFlow * 12);
      expect(outputs.cashOnCashReturn).toBeGreaterThan(0);
      expect(outputs.capRate).toBeGreaterThan(0);
      expect(outputs.investmentScore).toBeGreaterThanOrEqual(0);
      expect(outputs.investmentScore).toBeLessThanOrEqual(100);
      expect(outputs.riskScore).toBeGreaterThanOrEqual(0);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
      expect(outputs.cashFlowScore).toBeGreaterThanOrEqual(0);
      expect(outputs.cashFlowScore).toBeLessThanOrEqual(100);
      expect(outputs.appreciationScore).toBeGreaterThanOrEqual(0);
      expect(outputs.appreciationScore).toBeLessThanOrEqual(100);
    });

    it('should handle negative cash flow scenario', () => {
      const inputs: CalculatorInputs = {
        purchasePrice: 300000,
        downPayment: 60000,
        closingCosts: 9000,
        loanAmount: 240000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 1500, // Low rent
        propertyTaxes: 3600,
        insurance: 1800,
        maintenance: 500, // High maintenance
        propertyManagement: 10
      };
      
      const outputs = calculateRentalPropertyROI(inputs);
      
      expect(outputs.monthlyCashFlow).toBeLessThan(0);
      expect(outputs.cashOnCashReturn).toBeLessThan(0);
      expect(outputs.investmentScore).toBeLessThan(50);
    });

    it('should calculate break-even analysis correctly', () => {
      const inputs: CalculatorInputs = {
        purchasePrice: 300000,
        downPayment: 60000,
        closingCosts: 9000,
        loanAmount: 240000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        propertyTaxes: 3600,
        insurance: 1800,
        maintenance: 200
      };
      
      const outputs = calculateRentalPropertyROI(inputs);
      
      expect(outputs.breakEvenRent).toBeGreaterThan(0);
      expect(outputs.breakEvenOccupancy).toBeGreaterThan(0);
      expect(outputs.breakEvenOccupancy).toBeLessThanOrEqual(100);
    });

    it('should calculate ROI metrics correctly', () => {
      const inputs: CalculatorInputs = {
        purchasePrice: 300000,
        downPayment: 60000,
        closingCosts: 9000,
        loanAmount: 240000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        appreciationRate: 3,
        holdingPeriod: 10
      };
      
      const outputs = calculateRentalPropertyROI(inputs);
      
      expect(outputs.totalROI).toBeDefined();
      expect(outputs.annualizedROI).toBeDefined();
      expect(outputs.paybackPeriod).toBeDefined();
      expect(outputs.internalRateOfReturn).toBeDefined();
      expect(outputs.netPresentValue).toBeDefined();
    });

    it('should generate appropriate recommendations', () => {
      const inputs: CalculatorInputs = {
        purchasePrice: 300000,
        downPayment: 60000,
        closingCosts: 9000,
        loanAmount: 240000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        appreciationRate: 3,
        holdingPeriod: 10
      };
      
      const outputs = calculateRentalPropertyROI(inputs);
      
      expect(outputs.recommendation).toBeDefined();
      expect(typeof outputs.recommendation).toBe('string');
      expect(outputs.recommendation.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero down payment', () => {
      const inputs: CalculatorInputs = {
        purchasePrice: 300000,
        downPayment: 0,
        closingCosts: 9000,
        loanAmount: 300000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500
      };
      
      const outputs = calculateRentalPropertyROI(inputs);
      expect(outputs.totalInvestment).toBe(9000); // Only closing costs
    });

    it('should handle very high vacancy rates', () => {
      const inputs: CalculatorInputs = {
        purchasePrice: 300000,
        downPayment: 60000,
        closingCosts: 9000,
        loanAmount: 240000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        vacancyRate: 40 // Very high vacancy
      };
      
      const outputs = calculateRentalPropertyROI(inputs);
      expect(outputs.riskScore).toBeGreaterThan(50);
    });

    it('should handle negative appreciation', () => {
      const inputs: CalculatorInputs = {
        purchasePrice: 300000,
        downPayment: 60000,
        closingCosts: 9000,
        loanAmount: 240000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        appreciationRate: -5 // Negative appreciation
      };
      
      const outputs = calculateRentalPropertyROI(inputs);
      expect(outputs.appreciationScore).toBeLessThan(50);
    });

    it('should handle very short holding periods', () => {
      const inputs: CalculatorInputs = {
        purchasePrice: 300000,
        downPayment: 60000,
        closingCosts: 9000,
        loanAmount: 240000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        holdingPeriod: 1 // Very short holding period
      };
      
      const outputs = calculateRentalPropertyROI(inputs);
      expect(outputs.riskScore).toBeGreaterThan(50);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs: CalculatorInputs = {
        purchasePrice: 300000,
        downPayment: 60000,
        closingCosts: 9000,
        loanAmount: 240000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        appreciationRate: 3,
        holdingPeriod: 10
      };
      
      const outputs = calculateRentalPropertyROI(inputs);
      const report = generateRentalPropertyAnalysis(inputs, outputs);
      
      expect(report).toContain('Rental Property Investment Analysis');
      expect(report).toContain('Summary');
      expect(report).toContain('Investment Overview');
      expect(report).toContain('Cash Flow Analysis');
      expect(report).toContain('ROI Metrics');
      expect(report).toContain('Financial Health');
      expect(report).toContain('Investment Returns');
      expect(report).toContain('Key Strengths');
      expect(report).toContain('Key Risks');
      expect(report).toContain('Recommendations');
    });

    it('should include all calculated values in report', () => {
      const inputs: CalculatorInputs = {
        purchasePrice: 300000,
        downPayment: 60000,
        closingCosts: 9000,
        loanAmount: 240000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        appreciationRate: 3,
        holdingPeriod: 10
      };
      
      const outputs = calculateRentalPropertyROI(inputs);
      const report = generateRentalPropertyAnalysis(inputs, outputs);
      
      expect(report).toContain(outputs.recommendation);
      expect(report).toContain(outputs.investmentScore.toString());
      expect(report).toContain(outputs.monthlyCashFlow.toLocaleString());
      expect(report).toContain(outputs.annualCashFlow.toLocaleString());
      expect(report).toContain(outputs.cashOnCashReturn.toString());
    });
  });

  describe('Integration', () => {
    it('should work with calculator interface', () => {
      const inputs: CalculatorInputs = {
        purchasePrice: 300000,
        downPayment: 60000,
        closingCosts: 9000,
        loanAmount: 240000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500
      };
      
      const outputs = RentalPropertyROICalculator.calculate(inputs);
      const report = RentalPropertyROICalculator.generateReport(inputs, outputs);
      
      expect(outputs).toBeDefined();
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
    });
  });
});
