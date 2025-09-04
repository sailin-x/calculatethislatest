import { describe, it, expect } from 'vitest';
import { mortgageRefinanceCalculator } from './MortgageRefinanceCalculator';
import { mortgageRefinanceFormulas } from './formulas';
import { mortgageRefinanceValidationRules } from './validation';

describe('Mortgage Refinance Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have required properties', () => {
      expect(mortgageRefinanceCalculator.id).toBe('mortgage-refinance');
      expect(mortgageRefinanceCalculator.title).toBe('Mortgage Refinance Calculator');
      expect(mortgageRefinanceCalculator.category).toBe('finance');
      expect(mortgageRefinanceCalculator.subcategory).toBe('mortgage');
      expect(mortgageRefinanceCalculator.description).toBeTruthy();
      expect(mortgageRefinanceCalculator.usageInstructions).toBeInstanceOf(Array);
      expect(mortgageRefinanceCalculator.inputs).toBeInstanceOf(Array);
      expect(mortgageRefinanceCalculator.outputs).toBeInstanceOf(Array);
      expect(mortgageRefinanceCalculator.formulas).toBeInstanceOf(Array);
      expect(mortgageRefinanceCalculator.validationRules).toBeInstanceOf(Array);
      expect(mortgageRefinanceCalculator.examples).toBeInstanceOf(Array);
    });

    it('should have correct number of inputs', () => {
      expect(mortgageRefinanceCalculator.inputs).toHaveLength(20);
    });

    it('should have correct number of outputs', () => {
      expect(mortgageRefinanceCalculator.outputs).toHaveLength(10);
    });

    it('should have required inputs', () => {
      const requiredInputs = mortgageRefinanceCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(10);
    });

    it('should have formulas', () => {
      expect(mortgageRefinanceCalculator.formulas).toHaveLength(1);
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const requiredRule = mortgageRefinanceValidationRules.find(r => r.type === 'required' && r.field === 'currentLoanAmount');
      expect(requiredRule).toBeDefined();
      expect(requiredRule?.validator(100000, {})).toBe(true);
      expect(requiredRule?.validator(null, {})).toBe(false);
      expect(requiredRule?.validator(undefined, {})).toBe(false);
    });

    it('should validate range constraints', () => {
      const rangeRule = mortgageRefinanceValidationRules.find(r => r.type === 'range' && r.field === 'currentLoanAmount');
      expect(rangeRule).toBeDefined();
      expect(rangeRule?.validator(100000, {})).toBe(true);
      expect(rangeRule?.validator(0, {})).toBe(false);
      expect(rangeRule?.validator(-1000, {})).toBe(false);
    });

    it('should validate business rules', () => {
      const businessRule = mortgageRefinanceValidationRules.find(r => r.type === 'business' && r.field === 'newLoanAmount');
      expect(businessRule).toBeDefined();
      expect(businessRule?.validator(150000, { currentLoanAmount: 100000 })).toBe(true);
      expect(businessRule?.validator(50000, { currentLoanAmount: 100000 })).toBe(false);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate monthly payment savings', () => {
      const formula = mortgageRefinanceFormulas.find(f => f.id === 'payment-savings-calculation');
      expect(formula).toBeDefined();

      const inputs = {
        currentMonthlyPayment: 1200,
        newMonthlyPayment: 1000
      };

      const result = formula!.calculate(inputs);
      expect(result.outputs.monthlyPaymentSavings).toBe(200);
      expect(result.explanation).toBeTruthy();
    });

    it('should calculate interest savings', () => {
      const formula = mortgageRefinanceFormulas.find(f => f.id === 'interest-savings-calculation');
      expect(formula).toBeDefined();

      const inputs = {
        currentLoanAmount: 200000,
        currentInterestRate: 0.05,
        newInterestRate: 0.04,
        newLoanTerm: 30
      };

      const result = formula!.calculate(inputs);
      expect(result.outputs.totalInterestSavings).toBeGreaterThan(0);
      expect(result.explanation).toBeTruthy();
    });

    it('should calculate break-even period', () => {
      const formula = mortgageRefinanceFormulas.find(f => f.id === 'break-even-analysis');
      expect(formula).toBeDefined();

      const inputs = {
        closingCosts: 5000,
        monthlyPaymentSavings: 200
      };

      const result = formula!.calculate(inputs);
      expect(result.outputs.breakEvenMonths).toBe(25);
      expect(result.explanation).toBeTruthy();
    });

    it('should calculate ROI', () => {
      const formula = mortgageRefinanceFormulas.find(f => f.id === 'roi-calculation');
      expect(formula).toBeDefined();

      const inputs = {
        totalInterestSavings: 50000,
        closingCosts: 5000,
        newLoanTerm: 30
      };

      const result = formula!.calculate(inputs);
      expect(result.outputs.roi).toBeGreaterThan(0);
      expect(result.explanation).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero interest rates', () => {
      const formula = mortgageRefinanceFormulas.find(f => f.id === 'interest-savings-calculation');
      const inputs = {
        currentLoanAmount: 200000,
        currentInterestRate: 0,
        newInterestRate: 0.04,
        newLoanTerm: 30
      };

      const result = formula!.calculate(inputs);
      expect(result.outputs.totalInterestSavings).toBe(0);
    });

    it('should handle missing inputs gracefully', () => {
      const formula = mortgageRefinanceFormulas.find(f => f.id === 'payment-savings-calculation');
      const inputs = {};

      const result = formula!.calculate(inputs);
      expect(result.outputs.monthlyPaymentSavings).toBe(0);
    });

    it('should handle very high interest rates', () => {
      const formula = mortgageRefinanceFormulas.find(f => f.id === 'interest-savings-calculation');
      const inputs = {
        currentLoanAmount: 200000,
        currentInterestRate: 0.15,
        newInterestRate: 0.04,
        newLoanTerm: 30
      };

      const result = formula!.calculate(inputs);
      expect(result.outputs.totalInterestSavings).toBeGreaterThan(0);
    });
  });

  describe('Examples', () => {
    it('should have valid example inputs', () => {
      const example = mortgageRefinanceCalculator.examples[0];
      expect(example.title).toBeTruthy();
      expect(example.description).toBeTruthy();
      expect(example.inputs).toBeInstanceOf(Object);
      expect(example.expectedOutputs).toBeInstanceOf(Object);
    });

    it('should validate example calculations', () => {
      const example = mortgageRefinanceCalculator.examples[0];
      const result = mortgageRefinanceCalculator.formulas[0].calculate(example.inputs);
      
      expect(result.outputs).toBeDefined();
      expect(result.explanation).toBeTruthy();
    });
  });

  describe('Formulas Module', () => {
    it('should export all required formulas', () => {
      expect(mortgageRefinanceFormulas).toHaveLength(5);
      expect(mortgageRefinanceFormulas.find(f => f.id === 'payment-savings-calculation')).toBeDefined();
      expect(mortgageRefinanceFormulas.find(f => f.id === 'interest-savings-calculation')).toBeDefined();
      expect(mortgageRefinanceFormulas.find(f => f.id === 'break-even-analysis')).toBeDefined();
      expect(mortgageRefinanceFormulas.find(f => f.id === 'roi-calculation')).toBeDefined();
      expect(mortgageRefinanceFormulas.find(f => f.id === 'tax-benefit-calculation')).toBeDefined();
    });
  });

  describe('Validation Module', () => {
    it('should export all required validation rules', () => {
      expect(mortgageRefinanceValidationRules).toHaveLength(24);
      
      const requiredRules = mortgageRefinanceValidationRules.filter(r => r.type === 'required');
      const rangeRules = mortgageRefinanceValidationRules.filter(r => r.type === 'range');
      const businessRules = mortgageRefinanceValidationRules.filter(r => r.type === 'business');
      
      expect(requiredRules).toHaveLength(10);
      expect(rangeRules).toHaveLength(9);
      expect(businessRules).toHaveLength(5);
    });
  });
});