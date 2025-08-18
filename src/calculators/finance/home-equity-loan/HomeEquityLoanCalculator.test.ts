import { describe, it, expect } from 'vitest';
import { HomeEquityLoanCalculator } from './HomeEquityLoanCalculator';
import { calculateHomeEquityLoan } from './formulas';
import { validateHomeEquityLoanInputs } from './validation';
import { validateAllHomeEquityLoanInputs } from './quickValidation';

describe('Home Equity Loan Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(HomeEquityLoanCalculator.id).toBe('home-equity-loan-calculator');
      expect(HomeEquityLoanCalculator.name).toBe('Home Equity Loan Calculator');
      expect(HomeEquityLoanCalculator.category).toBe('finance');
      expect(HomeEquityLoanCalculator.subcategory).toBe('investment');
    });

    it('should have required input fields', () => {
      const requiredInputs = [
        'homeValue', 'currentMortgageBalance', 'loanAmount', 'interestRate', 'loanTerm'
      ];
      
      requiredInputs.forEach(inputId => {
        const input = HomeEquityLoanCalculator.inputs.find(i => i.id === inputId);
        expect(input).toBeDefined();
        expect(input?.required).toBe(true);
      });
    });

    it('should have correct output fields', () => {
      const expectedOutputs = [
        'availableEquity', 'maxLoanAmount', 'approvedLoanAmount', 'currentLTV',
        'proposedCLTV', 'monthlyPayment', 'totalFees', 'apr', 'effectiveRate',
        'totalInterest', 'totalCost', 'debtServiceCoverage', 'paymentToIncomeRatio',
        'breakEvenMonths', 'taxBenefits', 'inflationHedgeScore', 'liquidityScore',
        'riskScore', 'feasibilityScore', 'maxBorrowingAmount', 'recommendedLoanAmount',
        'monthlyCashFlow', 'annualCashFlow', 'equityUtilization', 'costOfBorrowing',
        'investmentGrade', 'recommendedAction', 'homeEquityLoanAnalysis'
      ];
      
      expectedOutputs.forEach(outputId => {
        const output = HomeEquityLoanCalculator.outputs.find(o => o.id === outputId);
        expect(output).toBeDefined();
      });
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateHomeEquityLoanInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Home value is required');
      expect(result.errors).toContain('Current mortgage balance is required');
      expect(result.errors).toContain('Loan amount is required');
      expect(result.errors).toContain('Interest rate is required');
      expect(result.errors).toContain('Loan term is required');
    });

    it('should validate numerical ranges', () => {
      const result = validateHomeEquityLoanInputs({
        homeValue: 5000,
        currentMortgageBalance: 300000,
        loanAmount: 50000,
        interestRate: 7.5,
        loanTerm: 15,
        propertyType: 'single-family',
        occupancyType: 'primary-residence'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Home value must be between $10,000 and $10,000,000');
    });

    it('should validate logical relationships', () => {
      const result = validateHomeEquityLoanInputs({
        homeValue: 500000,
        currentMortgageBalance: 600000,
        loanAmount: 50000,
        interestRate: 7.5,
        loanTerm: 15,
        propertyType: 'single-family',
        occupancyType: 'primary-residence'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Current mortgage balance cannot exceed home value');
    });

    it('should validate enum values', () => {
      const result = validateHomeEquityLoanInputs({
        homeValue: 500000,
        currentMortgageBalance: 300000,
        loanAmount: 50000,
        interestRate: 7.5,
        loanTerm: 15,
        propertyType: 'invalid-type',
        occupancyType: 'primary-residence'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid property type. Must be one of: single-family, condo, townhouse, multi-family');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic home equity loan metrics correctly', () => {
      const inputs = {
        homeValue: 500000,
        currentMortgageBalance: 300000,
        loanAmount: 50000,
        interestRate: 7.5,
        loanTerm: 15,
        propertyType: 'single-family',
        occupancyType: 'primary-residence'
      };

      const outputs = calculateHomeEquityLoan(inputs);

      expect(outputs.availableEquity).toBe(200000);
      expect(outputs.currentLTV).toBe(60);
      expect(outputs.proposedCLTV).toBe(70);
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
      expect(outputs.totalFees).toBeGreaterThan(0);
    });

    it('should calculate feasibility and risk scores', () => {
      const inputs = {
        homeValue: 500000,
        currentMortgageBalance: 300000,
        loanAmount: 50000,
        interestRate: 7.5,
        loanTerm: 15,
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        creditScore: 750,
        debtToIncomeRatio: 35,
        monthlyIncome: 8000
      };

      const outputs = calculateHomeEquityLoan(inputs);

      expect(outputs.feasibilityScore).toBeGreaterThan(0);
      expect(outputs.feasibilityScore).toBeLessThanOrEqual(100);
      expect(outputs.riskScore).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
    });

    it('should handle edge cases', () => {
      const inputs = {
        homeValue: 10000000,
        currentMortgageBalance: 5000000,
        loanAmount: 1000000,
        interestRate: 1,
        loanTerm: 1,
        propertyType: 'single-family',
        occupancyType: 'primary-residence'
      };

      const outputs = calculateHomeEquityLoan(inputs);

      expect(outputs.availableEquity).toBe(5000000);
      expect(outputs.currentLTV).toBe(50);
      expect(outputs.proposedCLTV).toBe(60);
    });
  });

  describe('Home Equity Loan Analysis', () => {
    it('should generate comprehensive analysis', () => {
      const inputs = {
        homeValue: 500000,
        currentMortgageBalance: 300000,
        loanAmount: 50000,
        interestRate: 7.5,
        loanTerm: 15,
        propertyType: 'single-family',
        occupancyType: 'primary-residence'
      };

      const outputs = calculateHomeEquityLoan(inputs);
      const analysis = HomeEquityLoanCalculator.generateReport(inputs, outputs);

      expect(analysis).toContain('Home Equity Loan Analysis');
      expect(analysis).toContain('Available Equity');
      expect(analysis).toContain('Maximum Loan Amount');
      expect(analysis).toContain('Recommendations');
    });
  });

  describe('Edge Cases', () => {
    it('should handle maximum values', () => {
      const inputs = {
        homeValue: 10000000,
        currentMortgageBalance: 5000000,
        loanAmount: 1000000,
        interestRate: 20,
        loanTerm: 30,
        propertyType: 'single-family',
        occupancyType: 'primary-residence'
      };

      const outputs = calculateHomeEquityLoan(inputs);
      expect(outputs.availableEquity).toBe(5000000);
      expect(outputs.riskScore).toBeGreaterThan(0);
    });

    it('should handle minimum values', () => {
      const inputs = {
        homeValue: 10000,
        currentMortgageBalance: 0,
        loanAmount: 1000,
        interestRate: 1,
        loanTerm: 1,
        propertyType: 'single-family',
        occupancyType: 'primary-residence'
      };

      const outputs = calculateHomeEquityLoan(inputs);
      expect(outputs.availableEquity).toBe(10000);
      expect(outputs.currentLTV).toBe(0);
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields', () => {
      const { validateHomeValue, validateInterestRate } = require('./quickValidation');
      
      expect(validateHomeValue(500000).isValid).toBe(true);
      expect(validateHomeValue(5000).isValid).toBe(false);
      expect(validateInterestRate(7.5).isValid).toBe(true);
      expect(validateInterestRate(25).isValid).toBe(false);
    });

    it('should validate all inputs together', () => {
      const inputs = {
        homeValue: 500000,
        currentMortgageBalance: 300000,
        loanAmount: 50000,
        interestRate: 7.5,
        loanTerm: 15,
        propertyType: 'single-family',
        occupancyType: 'primary-residence'
      };

      const result = validateAllHomeEquityLoanInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch validation errors in quick validation', () => {
      const inputs = {
        homeValue: 5000,
        currentMortgageBalance: 300000,
        loanAmount: 50000,
        interestRate: 25,
        propertyType: 'invalid-type'
      };

      const result = validateAllHomeEquityLoanInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
});
