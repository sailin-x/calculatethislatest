import { describe, it, expect } from 'vitest';
import { RefinanceCalculator } from './RefinanceCalculator';
import { validateRefinanceInputs } from './validation';
import { validateAllRefinanceInputs } from './quickValidation';
import { calculateRefinance, generateRefinanceAnalysis } from './formulas';
import { CalculatorInputs, CalculatorOutputs } from '../../types/calculator';

describe('RefinanceCalculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(RefinanceCalculator.id).toBe('refinance-calculator');
      expect(RefinanceCalculator.name).toBe('Refinance Calculator');
      expect(RefinanceCalculator.category).toBe('finance');
      expect(RefinanceCalculator.subcategory).toBe('mortgage');
    });

    it('should have required inputs', () => {
      const requiredInputs = [
        'currentLoanBalance', 'currentInterestRate', 'currentMonthlyPayment', 'currentLoanTerm',
        'newLoanAmount', 'newInterestRate', 'newLoanTerm', 'propertyValue', 'closingCosts'
      ];
      
      requiredInputs.forEach(inputId => {
        const input = RefinanceCalculator.inputs.find(i => i.id === inputId);
        expect(input).toBeDefined();
        expect(input?.required).toBe(true);
      });
    });

    it('should have required outputs', () => {
      const requiredOutputs = [
        'monthlySavings', 'annualSavings', 'breakEvenMonths', 'newMonthlyPayment',
        'refinanceScore', 'recommendation'
      ];
      
      requiredOutputs.forEach(outputId => {
        const output = RefinanceCalculator.outputs.find(o => o.id === outputId);
        expect(output).toBeDefined();
      });
    });

    it('should have calculation and report generation functions', () => {
      expect(typeof RefinanceCalculator.calculate).toBe('function');
      expect(typeof RefinanceCalculator.generateReport).toBe('function');
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const inputs: CalculatorInputs = {};
      const result = validateRefinanceInputs(inputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Current loan balance is required and must be greater than 0');
      expect(result.errors).toContain('Current interest rate is required and must be non-negative');
      expect(result.errors).toContain('Current monthly payment is required and must be greater than 0');
      expect(result.errors).toContain('Current loan term is required and must be greater than 0');
      expect(result.errors).toContain('New loan amount is required and must be greater than 0');
      expect(result.errors).toContain('New interest rate is required and must be non-negative');
      expect(result.errors).toContain('New loan term is required and must be greater than 0');
      expect(result.errors).toContain('Property value is required and must be greater than 0');
      expect(result.errors).toContain('Closing costs are required and must be non-negative');
    });

    it('should validate interest rate ranges', () => {
      const inputs: CalculatorInputs = {
        currentLoanBalance: 250000,
        currentInterestRate: 25, // Invalid: too high
        currentMonthlyPayment: 1580,
        currentLoanTerm: 25,
        newLoanAmount: 250000,
        newInterestRate: -1, // Invalid: negative
        newLoanTerm: 30,
        propertyValue: 350000,
        closingCosts: 5000
      };
      
      const result = validateRefinanceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Current interest rate must be between 0% and 20%');
      expect(result.errors).toContain('New interest rate must be between 0% and 20%');
    });

    it('should validate loan term ranges', () => {
      const inputs: CalculatorInputs = {
        currentLoanBalance: 250000,
        currentInterestRate: 6.5,
        currentMonthlyPayment: 1580,
        currentLoanTerm: 60, // Invalid: too high
        newLoanAmount: 250000,
        newInterestRate: 5.5,
        newLoanTerm: 0, // Invalid: zero
        propertyValue: 350000,
        closingCosts: 5000
      };
      
      const result = validateRefinanceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Current loan term must be between 1 and 50 years');
      expect(result.errors).toContain('New loan term must be between 1 and 50 years');
    });

    it('should validate loan amount ranges', () => {
      const inputs: CalculatorInputs = {
        currentLoanBalance: 15000000, // Invalid: too high
        currentInterestRate: 6.5,
        currentMonthlyPayment: 1580,
        currentLoanTerm: 25,
        newLoanAmount: -1000, // Invalid: negative
        newInterestRate: 5.5,
        newLoanTerm: 30,
        propertyValue: 350000,
        closingCosts: 5000
      };
      
      const result = validateRefinanceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Current loan balance must be between $0 and $10,000,000');
      expect(result.errors).toContain('New loan amount must be greater than 0');
    });

    it('should validate enum values', () => {
      const inputs: CalculatorInputs = {
        currentLoanBalance: 250000,
        currentInterestRate: 6.5,
        currentMonthlyPayment: 1580,
        currentLoanTerm: 25,
        currentLoanType: 'invalid-type', // Invalid enum
        newLoanAmount: 250000,
        newInterestRate: 5.5,
        newLoanTerm: 30,
        newLoanType: 'invalid-type', // Invalid enum
        propertyValue: 350000,
        closingCosts: 5000
      };
      
      const result = validateRefinanceInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Current loan type must be one of: conventional, fha, va, usda');
      expect(result.errors).toContain('New loan type must be one of: conventional, fha, va, usda');
    });

    it('should provide warnings for logical issues', () => {
      const inputs: CalculatorInputs = {
        currentLoanBalance: 250000,
        currentInterestRate: 6.5,
        currentMonthlyPayment: 1580,
        currentLoanTerm: 25,
        newLoanAmount: 500000, // Much higher than current
        newInterestRate: 7.0, // Higher than current
        newLoanTerm: 30,
        propertyValue: 350000,
        closingCosts: 5000
      };
      
      const result = validateRefinanceInputs(inputs);
      expect(result.warnings).toContain('New loan amount is significantly higher than current balance - verify cash-out amount');
      expect(result.warnings).toContain('New interest rate is not lower than current rate - refinancing may not be beneficial');
    });

    it('should accept valid inputs', () => {
      const inputs: CalculatorInputs = {
        currentLoanBalance: 250000,
        currentInterestRate: 6.5,
        currentMonthlyPayment: 1580,
        currentLoanTerm: 25,
        currentLoanType: 'conventional',
        newLoanAmount: 250000,
        newInterestRate: 5.5,
        newLoanTerm: 30,
        newLoanType: 'conventional',
        propertyValue: 350000,
        closingCosts: 5000
      };
      
      const result = validateRefinanceInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields', () => {
      const { validateCurrentLoanBalance, validateNewInterestRate } = require('./quickValidation');
      
      expect(validateCurrentLoanBalance(0)).toBe('Current loan balance must be greater than 0');
      expect(validateCurrentLoanBalance(250000)).toBeNull();
      
      expect(validateNewInterestRate(-1)).toBe('New interest rate must be non-negative');
      expect(validateNewInterestRate(5.5)).toBeNull();
    });

    it('should validate all inputs', () => {
      const inputs: CalculatorInputs = {
        currentLoanBalance: 250000,
        currentInterestRate: 6.5,
        currentMonthlyPayment: 1580,
        currentLoanTerm: 25,
        newLoanAmount: 250000,
        newInterestRate: 5.5,
        newLoanTerm: 30,
        propertyValue: 350000,
        closingCosts: 5000
      };
      
      const result = validateAllRefinanceInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic refinance metrics', () => {
      const inputs: CalculatorInputs = {
        currentLoanBalance: 250000,
        currentInterestRate: 6.5,
        currentMonthlyPayment: 1580,
        currentLoanTerm: 25,
        currentPMI: 50,
        currentPropertyTaxes: 300,
        currentInsurance: 150,
        newLoanAmount: 250000,
        newInterestRate: 5.5,
        newLoanTerm: 30,
        newPMI: 0,
        newPropertyTaxes: 300,
        newInsurance: 150,
        propertyValue: 350000,
        closingCosts: 5000,
        plannedOwnershipYears: 10,
        monthlyIncome: 8000,
        creditScore: 750,
        occupancyType: 'primary-residence',
        refinancePurpose: 'lower-rate',
        marketConditions: 'stable'
      };
      
      const outputs = calculateRefinance(inputs);
      
      expect(outputs.monthlySavings).toBeGreaterThan(0);
      expect(outputs.annualSavings).toBe(outputs.monthlySavings * 12);
      expect(outputs.breakEvenMonths).toBeGreaterThan(0);
      expect(outputs.newMonthlyPayment).toBeGreaterThan(0);
      expect(outputs.refinanceScore).toBeGreaterThanOrEqual(0);
      expect(outputs.refinanceScore).toBeLessThanOrEqual(100);
      expect(outputs.riskScore).toBeGreaterThanOrEqual(0);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
      expect(outputs.feasibilityScore).toBeGreaterThanOrEqual(0);
      expect(outputs.feasibilityScore).toBeLessThanOrEqual(100);
    });

    it('should handle no savings scenario', () => {
      const inputs: CalculatorInputs = {
        currentLoanBalance: 250000,
        currentInterestRate: 6.5,
        currentMonthlyPayment: 1580,
        currentLoanTerm: 25,
        newLoanAmount: 250000,
        newInterestRate: 6.5, // Same rate
        newLoanTerm: 25, // Same term
        propertyValue: 350000,
        closingCosts: 5000,
        plannedOwnershipYears: 10
      };
      
      const outputs = calculateRefinance(inputs);
      
      expect(outputs.monthlySavings).toBeLessThanOrEqual(0);
      expect(outputs.breakEvenMonths).toBe(Infinity);
      expect(outputs.refinanceScore).toBeLessThan(50);
    });

    it('should calculate break-even correctly', () => {
      const inputs: CalculatorInputs = {
        currentLoanBalance: 250000,
        currentInterestRate: 6.5,
        currentMonthlyPayment: 1580,
        currentLoanTerm: 25,
        newLoanAmount: 250000,
        newInterestRate: 5.5,
        newLoanTerm: 30,
        propertyValue: 350000,
        closingCosts: 6000, // $6,000 closing costs
        plannedOwnershipYears: 10
      };
      
      const outputs = calculateRefinance(inputs);
      
      // Break-even should be closing costs / monthly savings
      const expectedBreakEven = Math.ceil(6000 / outputs.monthlySavings);
      expect(outputs.breakEvenMonths).toBe(expectedBreakEven);
    });

    it('should calculate NPV and IRR', () => {
      const inputs: CalculatorInputs = {
        currentLoanBalance: 250000,
        currentInterestRate: 6.5,
        currentMonthlyPayment: 1580,
        currentLoanTerm: 25,
        newLoanAmount: 250000,
        newInterestRate: 5.5,
        newLoanTerm: 30,
        propertyValue: 350000,
        closingCosts: 5000,
        plannedOwnershipYears: 10,
        investmentReturn: 7
      };
      
      const outputs = calculateRefinance(inputs);
      
      expect(outputs.netPresentValue).toBeDefined();
      expect(outputs.internalRateOfReturn).toBeDefined();
      expect(outputs.paybackPeriod).toBeDefined();
    });

    it('should generate appropriate recommendations', () => {
      const inputs: CalculatorInputs = {
        currentLoanBalance: 250000,
        currentInterestRate: 6.5,
        currentMonthlyPayment: 1580,
        currentLoanTerm: 25,
        newLoanAmount: 250000,
        newInterestRate: 5.5,
        newLoanTerm: 30,
        propertyValue: 350000,
        closingCosts: 5000,
        plannedOwnershipYears: 10,
        monthlyIncome: 8000,
        creditScore: 750
      };
      
      const outputs = calculateRefinance(inputs);
      
      expect(outputs.recommendation).toBeDefined();
      expect(typeof outputs.recommendation).toBe('string');
      expect(outputs.recommendation.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero closing costs', () => {
      const inputs: CalculatorInputs = {
        currentLoanBalance: 250000,
        currentInterestRate: 6.5,
        currentMonthlyPayment: 1580,
        currentLoanTerm: 25,
        newLoanAmount: 250000,
        newInterestRate: 5.5,
        newLoanTerm: 30,
        propertyValue: 350000,
        closingCosts: 0,
        plannedOwnershipYears: 10
      };
      
      const outputs = calculateRefinance(inputs);
      expect(outputs.breakEvenMonths).toBe(0);
    });

    it('should handle very high closing costs', () => {
      const inputs: CalculatorInputs = {
        currentLoanBalance: 250000,
        currentInterestRate: 6.5,
        currentMonthlyPayment: 1580,
        currentLoanTerm: 25,
        newLoanAmount: 250000,
        newInterestRate: 5.5,
        newLoanTerm: 30,
        propertyValue: 350000,
        closingCosts: 50000,
        plannedOwnershipYears: 10
      };
      
      const outputs = calculateRefinance(inputs);
      expect(outputs.breakEvenMonths).toBeGreaterThan(100);
      expect(outputs.refinanceScore).toBeLessThan(30);
    });

    it('should handle cash-out refinance', () => {
      const inputs: CalculatorInputs = {
        currentLoanBalance: 250000,
        currentInterestRate: 6.5,
        currentMonthlyPayment: 1580,
        currentLoanTerm: 25,
        newLoanAmount: 300000, // Higher than current
        newInterestRate: 5.5,
        newLoanTerm: 30,
        propertyValue: 350000,
        closingCosts: 5000,
        cashOutAmount: 50000,
        refinancePurpose: 'cash-out'
      };
      
      const outputs = calculateRefinance(inputs);
      expect(outputs.principalIncrease).toBe(50000);
    });

    it('should handle very short ownership periods', () => {
      const inputs: CalculatorInputs = {
        currentLoanBalance: 250000,
        currentInterestRate: 6.5,
        currentMonthlyPayment: 1580,
        currentLoanTerm: 25,
        newLoanAmount: 250000,
        newInterestRate: 5.5,
        newLoanTerm: 30,
        propertyValue: 350000,
        closingCosts: 5000,
        plannedOwnershipYears: 1
      };
      
      const outputs = calculateRefinance(inputs);
      expect(outputs.riskScore).toBeGreaterThan(50);
    });
  });

  describe('Report Generation', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs: CalculatorInputs = {
        currentLoanBalance: 250000,
        currentInterestRate: 6.5,
        currentMonthlyPayment: 1580,
        currentLoanTerm: 25,
        newLoanAmount: 250000,
        newInterestRate: 5.5,
        newLoanTerm: 30,
        propertyValue: 350000,
        closingCosts: 5000,
        plannedOwnershipYears: 10
      };
      
      const outputs = calculateRefinance(inputs);
      const report = generateRefinanceAnalysis(inputs, outputs);
      
      expect(report).toContain('Refinance Analysis Report');
      expect(report).toContain('Summary');
      expect(report).toContain('Financial Impact');
      expect(report).toContain('Payment Comparison');
      expect(report).toContain('Long-Term Savings');
      expect(report).toContain('Investment Analysis');
      expect(report).toContain('Key Benefits');
      expect(report).toContain('Key Risks');
      expect(report).toContain('Recommendations');
    });

    it('should include all calculated values in report', () => {
      const inputs: CalculatorInputs = {
        currentLoanBalance: 250000,
        currentInterestRate: 6.5,
        currentMonthlyPayment: 1580,
        currentLoanTerm: 25,
        newLoanAmount: 250000,
        newInterestRate: 5.5,
        newLoanTerm: 30,
        propertyValue: 350000,
        closingCosts: 5000,
        plannedOwnershipYears: 10
      };
      
      const outputs = calculateRefinance(inputs);
      const report = generateRefinanceAnalysis(inputs, outputs);
      
      expect(report).toContain(outputs.recommendation);
      expect(report).toContain(outputs.refinanceScore.toString());
      expect(report).toContain(outputs.monthlySavings.toLocaleString());
      expect(report).toContain(outputs.annualSavings.toLocaleString());
      expect(report).toContain(outputs.breakEvenMonths.toString());
    });
  });

  describe('Integration', () => {
    it('should work with calculator interface', () => {
      const inputs: CalculatorInputs = {
        currentLoanBalance: 250000,
        currentInterestRate: 6.5,
        currentMonthlyPayment: 1580,
        currentLoanTerm: 25,
        newLoanAmount: 250000,
        newInterestRate: 5.5,
        newLoanTerm: 30,
        propertyValue: 350000,
        closingCosts: 5000
      };
      
      const outputs = RefinanceCalculator.calculate(inputs);
      const report = RefinanceCalculator.generateReport(inputs, outputs);
      
      expect(outputs).toBeDefined();
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
    });
  });
});
