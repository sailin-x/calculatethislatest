import { describe, it, expect } from 'vitest';
import { mortgagePaymentCalculator } from './MortgagePaymentCalculator';
import { mortgagePaymentFormulas } from './formulas';
import { mortgagePaymentValidationRules } from './validation';

describe('Mortgage Payment Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(mortgagePaymentCalculator.id).toBe('mortgage-payment-calculator');
      expect(mortgagePaymentCalculator.title).toBe('Mortgage Payment Calculator');
      expect(mortgagePaymentCalculator.category).toBe('finance');
      expect(mortgagePaymentCalculator.subcategory).toBe('Real Estate & Mortgage');
    });

    it('should have required inputs', () => {
      const requiredInputs = mortgagePaymentCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(3);
      expect(requiredInputs.map(input => input.id)).toContain('loanAmount');
      expect(requiredInputs.map(input => input.id)).toContain('interestRate');
      expect(requiredInputs.map(input => input.id)).toContain('loanTerm');
    });

    it('should have correct number of inputs', () => {
      expect(mortgagePaymentCalculator.inputs).toHaveLength(12);
    });

    it('should have correct number of outputs', () => {
      expect(mortgagePaymentCalculator.outputs).toHaveLength(9);
    });

    it('should have formulas', () => {
      expect(mortgagePaymentCalculator.formulas).toHaveLength(1);
      expect(mortgagePaymentCalculator.formulas[0].id).toBe('mortgage-payment-analysis');
    });

    it('should have validation rules', () => {
      expect(mortgagePaymentCalculator.validationRules).toHaveLength(3);
    });

    it('should have examples', () => {
      expect(mortgagePaymentCalculator.examples).toHaveLength(2);
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const loanAmountRule = mortgagePaymentCalculator.validationRules.find(r => r.field === 'loanAmount');
      expect(loanAmountRule?.validator(0)).toBe(false);
      expect(loanAmountRule?.validator(100000)).toBe(true);
      expect(loanAmountRule?.validator(null)).toBe(false);
      expect(loanAmountRule?.validator(undefined)).toBe(false);
    });

    it('should validate business rules', () => {
      const businessRule = mortgagePaymentCalculator.validationRules.find(r => r.type === 'business');
      expect(businessRule).toBeDefined();
      
      // Test loan amount + down payment = home price validation
      const inputs = { loanAmount: 300000, downPayment: 60000, homePrice: 360000 };
      expect(businessRule?.validator(300000, inputs)).toBe(true);
      
      const invalidInputs = { loanAmount: 300000, downPayment: 60000, homePrice: 400000 };
      expect(businessRule?.validator(300000, invalidInputs)).toBe(false);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate monthly payment correctly', () => {
      const inputs = {
        loanAmount: 300000,
        interestRate: 6.5,
        loanTerm: 30
      };
      
      const result = mortgagePaymentCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.monthlyPayment).toBe(1896);
      expect(result.outputs.totalMonthlyPayment).toBe(2230);
    });

    it('should calculate total interest correctly', () => {
      const inputs = {
        loanAmount: 300000,
        interestRate: 6.5,
        loanTerm: 30
      };
      
      const result = mortgagePaymentCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.totalInterestPaid).toBe(382000);
      expect(result.outputs.totalLoanCost).toBe(682000);
    });

    it('should calculate LTV ratio correctly', () => {
      const inputs = {
        loanAmount: 300000,
        homePrice: 360000
      };
      
      const result = mortgagePaymentCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.loanToValueRatio).toBe(83.33);
    });

    it('should handle interest-only payments', () => {
      const inputs = {
        loanAmount: 300000,
        interestRate: 6.5,
        loanTerm: 30,
        paymentType: 'interest-only'
      };
      
      const result = mortgagePaymentCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.monthlyPayment).toBe(1625); // 300000 * 0.065 / 12
    });

    it('should calculate extra payment benefits', () => {
      const inputs = {
        loanAmount: 250000,
        interestRate: 6.0,
        loanTerm: 15,
        extraPayment: 100
      };
      
      const result = mortgagePaymentCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.payoffTime).toBeLessThan(15);
      expect(result.outputs.interestSavings).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero interest rate', () => {
      const inputs = {
        loanAmount: 300000,
        interestRate: 0,
        loanTerm: 30
      };
      
      const result = mortgagePaymentCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.monthlyPayment).toBe(833); // 300000 / (30 * 12)
    });

    it('should handle missing optional inputs', () => {
      const inputs = {
        loanAmount: 300000,
        interestRate: 6.5,
        loanTerm: 30
      };
      
      const result = mortgagePaymentCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.totalMonthlyPayment).toBeGreaterThan(result.outputs.monthlyPayment);
    });

    it('should handle very high interest rates', () => {
      const inputs = {
        loanAmount: 100000,
        interestRate: 18,
        loanTerm: 30
      };
      
      const result = mortgagePaymentCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.totalInterestPaid).toBeGreaterThan(result.outputs.monthlyPayment * 100);
    });
  });

  describe('Examples', () => {
    it('should have valid example inputs', () => {
      const example = mortgagePaymentCalculator.examples[0];
      expect(example.inputs.loanAmount).toBe(300000);
      expect(example.inputs.interestRate).toBe(6.5);
      expect(example.inputs.loanTerm).toBe(30);
    });

    it('should have matching expected outputs', () => {
      const example = mortgagePaymentCalculator.examples[0];
      const result = mortgagePaymentCalculator.formulas[0].calculate(example.inputs);
      
      expect(result.outputs.monthlyPayment).toBe(example.expectedOutputs.monthlyPayment);
      expect(result.outputs.totalMonthlyPayment).toBe(example.expectedOutputs.totalMonthlyPayment);
      expect(result.outputs.totalInterestPaid).toBe(example.expectedOutputs.totalInterestPaid);
    });
  });

  describe('Formulas Module', () => {
    it('should export individual formulas', () => {
      expect(mortgagePaymentFormulas).toHaveLength(5);
      expect(mortgagePaymentFormulas[0].id).toBe('monthly-payment');
      expect(mortgagePaymentFormulas[1].id).toBe('total-interest');
      expect(mortgagePaymentFormulas[2].id).toBe('loan-to-value');
      expect(mortgagePaymentFormulas[3].id).toBe('total-monthly-payment');
      expect(mortgagePaymentFormulas[4].id).toBe('payoff-time-extra-payments');
    });

    it('should calculate individual formulas correctly', () => {
      const inputs = { loanAmount: 300000, interestRate: 6.5, loanTerm: 30 };
      
      const monthlyPayment = mortgagePaymentFormulas[0].calculate(inputs);
      expect(monthlyPayment).toBe(1896);
      
      const totalInterest = mortgagePaymentFormulas[1].calculate(inputs);
      expect(totalInterest).toBe(382000);
    });
  });

  describe('Validation Module', () => {
    it('should export validation rules', () => {
      expect(mortgagePaymentValidationRules).toHaveLength(20);
    });

    it('should have required field validations', () => {
      const requiredRules = mortgagePaymentValidationRules.filter(r => r.type === 'required');
      expect(requiredRules).toHaveLength(3);
    });

    it('should have range validations', () => {
      const rangeRules = mortgagePaymentValidationRules.filter(r => r.type === 'range');
      expect(rangeRules).toHaveLength(12);
    });

    it('should have business rule validations', () => {
      const businessRules = mortgagePaymentValidationRules.filter(r => r.type === 'business');
      expect(businessRules).toHaveLength(5);
    });
  });
});