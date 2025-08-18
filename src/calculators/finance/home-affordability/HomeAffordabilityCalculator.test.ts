import { describe, it, expect } from 'vitest';
import { HomeAffordabilityCalculator } from './HomeAffordabilityCalculator';
import { calculateHomeAffordability } from './formulas';
import { validateHomeAffordabilityInputs } from './validation';
import { validateAllHomeAffordabilityInputs } from './quickValidation';

describe('Home Affordability Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(HomeAffordabilityCalculator.id).toBe('home-affordability-calculator');
      expect(HomeAffordabilityCalculator.name).toBe('Home Affordability Calculator');
      expect(HomeAffordabilityCalculator.category).toBe('finance');
      expect(HomeAffordabilityCalculator.subcategory).toBe('investment');
    });

    it('should have required input fields', () => {
      const requiredInputs = [
        'annualIncome', 'downPayment', 'interestRate', 'loanTerm', 'loanType'
      ];
      
      requiredInputs.forEach(inputId => {
        const input = HomeAffordabilityCalculator.inputs.find(i => i.id === inputId);
        expect(input).toBeDefined();
        expect(input?.required).toBe(true);
      });
    });

    it('should have correct output fields', () => {
      const expectedOutputs = [
        'maxHomePrice', 'maxLoanAmount', 'monthlyPayment', 'monthlyPropertyTaxes',
        'monthlyInsurance', 'monthlyPMI', 'monthlyHoaFees', 'monthlyUtilities',
        'monthlyMaintenance', 'totalMonthlyPayment', 'frontEndDTI', 'backEndDTI',
        'paymentToIncomeRatio', 'debtServiceCoverage', 'affordabilityScore',
        'riskScore', 'comfortLevel', 'recommendedHomePrice', 'recommendedDownPayment',
        'monthlyCashFlow', 'annualCashFlow', 'emergencyFundMonths', 'taxBenefits',
        'breakEvenYears', 'totalCostOfOwnership', 'equityBuildUp', 'investmentReturn',
        'liquidityScore', 'flexibilityScore', 'stabilityScore', 'recommendedAction',
        'homeAffordabilityAnalysis'
      ];
      
      expectedOutputs.forEach(outputId => {
        const output = HomeAffordabilityCalculator.outputs.find(o => o.id === outputId);
        expect(output).toBeDefined();
      });
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateHomeAffordabilityInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Annual income is required');
      expect(result.errors).toContain('Down payment is required');
      expect(result.errors).toContain('Interest rate is required');
      expect(result.errors).toContain('Loan term is required');
      expect(result.errors).toContain('Loan type is required');
    });

    it('should validate numerical ranges', () => {
      const result = validateHomeAffordabilityInputs({
        annualIncome: 5000,
        downPayment: 20000,
        interestRate: 6.5,
        loanTerm: 30,
        loanType: 'conventional',
        propertyType: 'single-family',
        occupancyType: 'primary-residence'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Annual income must be between $10,000 and $10,000,000');
    });

    it('should validate logical relationships', () => {
      const result = validateHomeAffordabilityInputs({
        annualIncome: 75000,
        downPayment: 30000,
        interestRate: 6.5,
        loanTerm: 30,
        loanType: 'conventional',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        monthlyIncome: 10000,
        monthlyDebtPayments: 12000
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Monthly debt payments cannot exceed monthly income');
    });

    it('should validate enum values', () => {
      const result = validateHomeAffordabilityInputs({
        annualIncome: 75000,
        downPayment: 30000,
        interestRate: 6.5,
        loanTerm: 30,
        loanType: 'invalid-type',
        propertyType: 'single-family',
        occupancyType: 'primary-residence'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid loan type. Must be one of: conventional, fha, va, usda');
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate basic affordability metrics correctly', () => {
      const inputs = {
        annualIncome: 75000,
        downPayment: 30000,
        interestRate: 6.5,
        loanTerm: 30,
        loanType: 'conventional',
        propertyType: 'single-family',
        occupancyType: 'primary-residence'
      };

      const outputs = calculateHomeAffordability(inputs);

      expect(outputs.maxHomePrice).toBeGreaterThan(0);
      expect(outputs.maxLoanAmount).toBeGreaterThan(0);
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
      expect(outputs.totalMonthlyPayment).toBeGreaterThan(0);
      expect(outputs.frontEndDTI).toBeGreaterThan(0);
      expect(outputs.backEndDTI).toBeGreaterThan(0);
    });

    it('should calculate affordability and risk scores', () => {
      const inputs = {
        annualIncome: 75000,
        downPayment: 30000,
        interestRate: 6.5,
        loanTerm: 30,
        loanType: 'conventional',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        creditScore: 750,
        monthlyDebtPayments: 400,
        emergencyFund: 10000
      };

      const outputs = calculateHomeAffordability(inputs);

      expect(outputs.affordabilityScore).toBeGreaterThan(0);
      expect(outputs.affordabilityScore).toBeLessThanOrEqual(100);
      expect(outputs.riskScore).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
    });

    it('should handle edge cases', () => {
      const inputs = {
        annualIncome: 1000000,
        downPayment: 200000,
        interestRate: 1,
        loanTerm: 1,
        loanType: 'conventional',
        propertyType: 'single-family',
        occupancyType: 'primary-residence'
      };

      const outputs = calculateHomeAffordability(inputs);

      expect(outputs.maxHomePrice).toBeGreaterThan(0);
      expect(outputs.maxLoanAmount).toBeGreaterThan(0);
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
    });
  });

  describe('Home Affordability Analysis', () => {
    it('should generate comprehensive analysis', () => {
      const inputs = {
        annualIncome: 75000,
        downPayment: 30000,
        interestRate: 6.5,
        loanTerm: 30,
        loanType: 'conventional',
        propertyType: 'single-family',
        occupancyType: 'primary-residence'
      };

      const outputs = calculateHomeAffordability(inputs);
      const analysis = HomeAffordabilityCalculator.generateReport(inputs, outputs);

      expect(analysis).toContain('Home Affordability Analysis');
      expect(analysis).toContain('Maximum Home Price');
      expect(analysis).toContain('Affordability Score');
      expect(analysis).toContain('Recommendations');
    });
  });

  describe('Edge Cases', () => {
    it('should handle maximum values', () => {
      const inputs = {
        annualIncome: 10000000,
        downPayment: 1000000,
        interestRate: 20,
        loanTerm: 50,
        loanType: 'conventional',
        propertyType: 'single-family',
        occupancyType: 'primary-residence'
      };

      const outputs = calculateHomeAffordability(inputs);
      expect(outputs.maxHomePrice).toBeGreaterThan(0);
      expect(outputs.riskScore).toBeGreaterThan(0);
    });

    it('should handle minimum values', () => {
      const inputs = {
        annualIncome: 10000,
        downPayment: 0,
        interestRate: 1,
        loanTerm: 1,
        loanType: 'conventional',
        propertyType: 'single-family',
        occupancyType: 'primary-residence'
      };

      const outputs = calculateHomeAffordability(inputs);
      expect(outputs.maxHomePrice).toBeGreaterThan(0);
      expect(outputs.maxLoanAmount).toBeGreaterThan(0);
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields', () => {
      const { validateAnnualIncome, validateInterestRate } = require('./quickValidation');
      
      expect(validateAnnualIncome(75000).isValid).toBe(true);
      expect(validateAnnualIncome(5000).isValid).toBe(false);
      expect(validateInterestRate(6.5).isValid).toBe(true);
      expect(validateInterestRate(25).isValid).toBe(false);
    });

    it('should validate all inputs together', () => {
      const inputs = {
        annualIncome: 75000,
        downPayment: 30000,
        interestRate: 6.5,
        loanTerm: 30,
        loanType: 'conventional',
        propertyType: 'single-family',
        occupancyType: 'primary-residence'
      };

      const result = validateAllHomeAffordabilityInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch validation errors in quick validation', () => {
      const inputs = {
        annualIncome: 5000,
        downPayment: 30000,
        interestRate: 25,
        loanType: 'invalid-type'
      };

      const result = validateAllHomeAffordabilityInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
});
