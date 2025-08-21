import { describe, it, expect } from 'vitest';
import { RentVsBuyCalculator } from './RentVsBuyCalculator';
import { validateRentVsBuyInputs } from './validation';
import { validateAllRentVsBuyInputs } from './quickValidation';
import { calculateRentVsBuy, generateRentVsBuyAnalysis } from './formulas';
import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

describe('RentVsBuyCalculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(RentVsBuyCalculator.id).toBe('rent-vs-buy-calculator');
      expect(RentVsBuyCalculator.name).toBe('Rent vs. Buy Calculator');
      expect(RentVsBuyCalculator.category).toBe('finance');
      expect(RentVsBuyCalculator.subcategory).toBe('real-estate');
    });

    it('should have required inputs', () => {
      const requiredInputs = [
        'homePrice', 'downPayment', 'interestRate', 'loanTerm', 'monthlyRent', 'timeHorizon'
      ];
      
      requiredInputs.forEach(inputId => {
        const input = RentVsBuyCalculator.inputs.find(i => i.id === inputId);
        expect(input).toBeDefined();
        expect(input?.required).toBe(true);
      });
    });

    it('should have required outputs', () => {
      const requiredOutputs = [
        'monthlyRentCost', 'monthlyBuyCost', 'totalRentCost', 'netBuyCost',
        'breakEvenYears', 'recommendation'
      ];
      
      requiredOutputs.forEach(outputId => {
        const output = RentVsBuyCalculator.outputs.find(o => o.id === outputId);
        expect(output).toBeDefined();
      });
    });

    it('should have calculation and report generation functions', () => {
      expect(typeof RentVsBuyCalculator.calculate).toBe('function');
      expect(typeof RentVsBuyCalculator.generateReport).toBe('function');
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const inputs: CalculatorInputs = {};
      const result = validateRentVsBuyInputs(inputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Home price is required and must be greater than 0');
      expect(result.errors).toContain('Down payment is required and cannot be negative');
      expect(result.errors).toContain('Interest rate is required and cannot be negative');
      expect(result.errors).toContain('Loan term is required and must be at least 1 year');
      expect(result.errors).toContain('Monthly rent is required and must be greater than 0');
      expect(result.errors).toContain('Time horizon is required and must be at least 1 year');
    });

    it('should validate home price ranges', () => {
      const inputs: CalculatorInputs = {
        homePrice: 15000000 // Invalid: too high
      };
      
      const result = validateRentVsBuyInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Home price must be between $0 and $10,000,000');
    });

    it('should validate down payment logic', () => {
      const inputs: CalculatorInputs = {
        homePrice: 400000,
        downPayment: 500000 // Invalid: exceeds home price
      };
      
      const result = validateRentVsBuyInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Down payment cannot exceed home price');
    });

    it('should validate enum values', () => {
      const inputs: CalculatorInputs = {
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        timeHorizon: 7,
        analysisPeriod: 'invalid-period', // Invalid enum
        propertyTaxDeductible: 'invalid-deduction', // Invalid enum
        lifestylePreference: 'invalid-preference', // Invalid enum
        maintenancePreference: 'invalid-maintenance' // Invalid enum
      };
      
      const result = validateRentVsBuyInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Analysis period must be one of: 1-year, 3-year, 5-year, 7-year, 10-year, 15-year, 30-year');
      expect(result.errors).toContain('Property tax deductible must be one of: yes, no, partial');
      expect(result.errors).toContain('Lifestyle preference must be one of: flexibility, stability, neutral');
      expect(result.errors).toContain('Maintenance preference must be one of: avoid, handle, neutral');
    });

    it('should provide warnings for logical issues', () => {
      const inputs: CalculatorInputs = {
        homePrice: 400000,
        downPayment: 10000, // Very low down payment
        interestRate: 10, // High interest rate
        loanTerm: 30,
        monthlyRent: 2500,
        timeHorizon: 2, // Short time horizon
        homeAppreciationRate: -5 // Negative appreciation
      };
      
      const result = validateRentVsBuyInputs(inputs);
      expect(result.warnings).toContain('Down payment is less than 5% - may require PMI and higher interest rates');
      expect(result.warnings).toContain('Down payment is less than 20% - PMI will likely be required');
      expect(result.warnings).toContain('Short time horizon may favor renting due to transaction costs');
      expect(result.warnings).toContain('High interest rate may make renting more attractive');
      expect(result.warnings).toContain('Negative home appreciation rate may favor renting');
    });

    it('should accept valid inputs', () => {
      const inputs: CalculatorInputs = {
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        timeHorizon: 7,
        analysisPeriod: '7-year',
        propertyTaxDeductible: 'yes',
        lifestylePreference: 'neutral',
        maintenancePreference: 'neutral'
      };
      
      const result = validateRentVsBuyInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields', () => {
      const { validateHomePrice, validateInterestRate } = require('./quickValidation');
      
      expect(validateHomePrice(0)).toBe('Home price must be greater than 0');
      expect(validateHomePrice(400000)).toBeNull();
      
      expect(validateInterestRate(-1)).toBe('Interest rate must be greater than or equal to 0');
      expect(validateInterestRate(6.5)).toBeNull();
    });

    it('should validate all inputs', () => {
      const inputs: CalculatorInputs = {
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        timeHorizon: 7
      };
      
      const result = validateAllRentVsBuyInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic rent vs buy metrics', () => {
      const inputs: CalculatorInputs = {
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        timeHorizon: 7
      };
      
      const outputs = calculateRentVsBuy(inputs);
      
      expect(outputs.monthlyRentCost).toBeGreaterThan(0);
      expect(outputs.monthlyBuyCost).toBeGreaterThan(0);
      expect(outputs.annualRentCost).toBe(outputs.monthlyRentCost * 12);
      expect(outputs.annualBuyCost).toBe(outputs.monthlyBuyCost * 12);
      expect(outputs.totalRentCost).toBeGreaterThan(0);
      expect(outputs.totalBuyCost).toBeGreaterThan(0);
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
      expect(outputs.totalInterest).toBeGreaterThan(0);
      expect(outputs.totalPrincipal).toBeGreaterThan(0);
      expect(outputs.homeValue).toBeGreaterThan(400000);
      expect(outputs.equity).toBeGreaterThan(0);
      expect(outputs.netBuyCost).toBeDefined();
      expect(outputs.opportunityCost).toBeGreaterThan(0);
      expect(outputs.taxSavings).toBeGreaterThan(0);
      expect(outputs.breakEvenYears).toBeGreaterThan(0);
      expect(outputs.breakEvenMonths).toBe(outputs.breakEvenYears * 12);
      expect(outputs.costDifference).toBeDefined();
      expect(outputs.monthlySavings).toBeDefined();
      expect(outputs.totalSavings).toBeGreaterThanOrEqual(0);
      expect(outputs.roi).toBeDefined();
      expect(outputs.internalRateOfReturn).toBeDefined();
      expect(outputs.netPresentValue).toBeDefined();
      expect(outputs.financialScore).toBeGreaterThanOrEqual(0);
      expect(outputs.financialScore).toBeLessThanOrEqual(100);
      expect(outputs.lifestyleScore).toBeGreaterThanOrEqual(0);
      expect(outputs.lifestyleScore).toBeLessThanOrEqual(100);
      expect(outputs.overallScore).toBeGreaterThanOrEqual(0);
      expect(outputs.overallScore).toBeLessThanOrEqual(100);
    });

    it('should handle high-cost scenarios', () => {
      const inputs: CalculatorInputs = {
        homePrice: 800000,
        downPayment: 160000,
        interestRate: 8.5,
        loanTerm: 30,
        monthlyRent: 4000,
        timeHorizon: 5,
        homeAppreciationRate: 1,
        investmentReturn: 10
      };
      
      const outputs = calculateRentVsBuy(inputs);
      
      expect(outputs.monthlyBuyCost).toBeGreaterThan(outputs.monthlyRentCost);
      expect(outputs.breakEvenYears).toBeGreaterThan(5);
      expect(outputs.financialScore).toBeLessThan(50);
    });

    it('should handle favorable buying scenarios', () => {
      const inputs: CalculatorInputs = {
        homePrice: 300000,
        downPayment: 60000,
        interestRate: 4.5,
        loanTerm: 30,
        monthlyRent: 2000,
        timeHorizon: 10,
        homeAppreciationRate: 5,
        investmentReturn: 6
      };
      
      const outputs = calculateRentVsBuy(inputs);
      
      expect(outputs.breakEvenYears).toBeLessThan(10);
      expect(outputs.financialScore).toBeGreaterThan(60);
      expect(outputs.recommendation).toBe('Buy');
    });

    it('should calculate tax benefits correctly', () => {
      const inputs: CalculatorInputs = {
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        timeHorizon: 7,
        marginalTaxRate: 24,
        stateTaxRate: 5,
        propertyTaxDeductible: 'yes'
      };
      
      const outputs = calculateRentVsBuy(inputs);
      
      expect(outputs.taxSavings).toBeGreaterThan(0);
      expect(outputs.netBuyCost).toBeLessThan(outputs.totalBuyCost);
    });

    it('should generate appropriate recommendations', () => {
      const inputs: CalculatorInputs = {
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        timeHorizon: 7
      };
      
      const outputs = calculateRentVsBuy(inputs);
      
      expect(outputs.recommendation).toBeDefined();
      expect(typeof outputs.recommendation).toBe('string');
      expect(outputs.recommendation.length).toBeGreaterThan(0);
      expect(outputs.keyFactors).toBeDefined();
      expect(outputs.risks).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero down payment', () => {
      const inputs: CalculatorInputs = {
        homePrice: 400000,
        downPayment: 0,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        timeHorizon: 7
      };
      
      const outputs = calculateRentVsBuy(inputs);
      expect(outputs.loanAmount).toBe(400000);
      expect(outputs.opportunityCost).toBe(0);
    });

    it('should handle very high interest rates', () => {
      const inputs: CalculatorInputs = {
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 15,
        loanTerm: 30,
        monthlyRent: 2500,
        timeHorizon: 7
      };
      
      const outputs = calculateRentVsBuy(inputs);
      expect(outputs.monthlyBuyCost).toBeGreaterThan(outputs.monthlyRentCost);
      expect(outputs.financialScore).toBeLessThan(50);
    });

    it('should handle negative home appreciation', () => {
      const inputs: CalculatorInputs = {
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        timeHorizon: 7,
        homeAppreciationRate: -5
      };
      
      const outputs = calculateRentVsBuy(inputs);
      expect(outputs.homeValue).toBeLessThan(400000);
      expect(outputs.equity).toBeLessThan(outputs.totalPrincipal);
    });

    it('should handle very short time horizons', () => {
      const inputs: CalculatorInputs = {
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        timeHorizon: 1
      };
      
      const outputs = calculateRentVsBuy(inputs);
      expect(outputs.breakEvenYears).toBeGreaterThan(1);
      expect(outputs.financialScore).toBeLessThan(50);
    });

    it('should handle very long time horizons', () => {
      const inputs: CalculatorInputs = {
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        timeHorizon: 30
      };
      
      const outputs = calculateRentVsBuy(inputs);
      expect(outputs.breakEvenYears).toBeLessThan(30);
      expect(outputs.financialScore).toBeGreaterThan(50);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs: CalculatorInputs = {
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        timeHorizon: 7
      };
      
      const outputs = calculateRentVsBuy(inputs);
      const report = generateRentVsBuyAnalysis(inputs, outputs);
      
      expect(report).toContain('Rent vs. Buy Analysis Report');
      expect(report).toContain('Summary');
      expect(report).toContain('Cost Comparison');
      expect(report).toContain('Financial Analysis');
      expect(report).toContain('Break-Even Analysis');
      expect(report).toContain('Investment Analysis');
      expect(report).toContain('Tax Benefits');
      expect(report).toContain('Property Details');
      expect(report).toContain('Home Value Projection');
      expect(report).toContain('Equity Building');
      expect(report).toContain('Key Factors');
      expect(report).toContain('Risks to Consider');
      expect(report).toContain('Detailed Breakdown');
      expect(report).toContain('Market Assumptions');
      expect(report).toContain('Recommendations');
      expect(report).toContain('Next Steps');
    });

    it('should include all calculated values in report', () => {
      const inputs: CalculatorInputs = {
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        timeHorizon: 7
      };
      
      const outputs = calculateRentVsBuy(inputs);
      const report = generateRentVsBuyAnalysis(inputs, outputs);
      
      expect(report).toContain(outputs.recommendation);
      expect(report).toContain(outputs.overallScore.toFixed(1));
      expect(report).toContain(outputs.financialScore.toFixed(1));
      expect(report).toContain(outputs.lifestyleScore.toFixed(1));
      expect(report).toContain(outputs.monthlyRentCost.toLocaleString());
      expect(report).toContain(outputs.monthlyBuyCost.toLocaleString());
      expect(report).toContain(outputs.totalRentCost.toLocaleString());
      expect(report).toContain(outputs.netBuyCost.toLocaleString());
      expect(report).toContain(outputs.breakEvenYears.toString());
    });
  });

  describe('Integration', () => {
    it('should work with calculator interface', () => {
      const inputs: CalculatorInputs = {
        homePrice: 400000,
        downPayment: 80000,
        interestRate: 6.5,
        loanTerm: 30,
        monthlyRent: 2500,
        timeHorizon: 7
      };
      
      const outputs = RentVsBuyCalculator.calculate(inputs);
      const report = RentVsBuyCalculator.generateReport(inputs, outputs);
      
      expect(outputs).toBeDefined();
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
    });
  });
});
