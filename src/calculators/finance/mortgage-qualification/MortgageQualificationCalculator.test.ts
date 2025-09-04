import { describe, it, expect } from 'vitest';
import { mortgageQualificationCalculator } from './MortgageQualificationCalculator';
import { mortgageQualificationFormulas } from './formulas';
import { mortgageQualificationValidationRules } from './validation';

describe('Mortgage Qualification Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(mortgageQualificationCalculator.id).toBe('mortgage-qualification-calculator');
      expect(mortgageQualificationCalculator.title).toBe('Mortgage Qualification Calculator');
      expect(mortgageQualificationCalculator.category).toBe('finance');
      expect(mortgageQualificationCalculator.subcategory).toBe('Real Estate & Mortgage');
    });

    it('should have required inputs', () => {
      const requiredInputs = mortgageQualificationCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(7);
      expect(requiredInputs.map(input => input.name)).toContain('Borrower Income');
      expect(requiredInputs.map(input => input.name)).toContain('Borrower Credit Score');
      expect(requiredInputs.map(input => input.name)).toContain('Property Value');
      expect(requiredInputs.map(input => input.name)).toContain('Loan Amount');
      expect(requiredInputs.map(input => input.name)).toContain('Interest Rate');
      expect(requiredInputs.map(input => input.name)).toContain('Loan Term');
      expect(requiredInputs.map(input => input.name)).toContain('Down Payment');
    });

    it('should have correct number of outputs', () => {
      expect(mortgageQualificationCalculator.outputs).toHaveLength(9);
    });

    it('should have formulas', () => {
      expect(mortgageQualificationCalculator.formulas).toHaveLength(1);
      expect(mortgageQualificationCalculator.formulas[0].id).toBe('mortgage-qualification-analysis');
    });

    it('should have validation rules', () => {
      expect(mortgageQualificationCalculator.validationRules).toHaveLength(16);
    });

    it('should have examples', () => {
      expect(mortgageQualificationCalculator.examples).toHaveLength(2);
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const requiredRule = mortgageQualificationValidationRules.find(r => r.field === 'borrowerIncome' && r.type === 'required');
      expect(requiredRule).toBeDefined();
      expect(requiredRule?.validator(0, {})).toBe(false);
      expect(requiredRule?.validator(50000, {})).toBe(true);
    });

    it('should validate range fields', () => {
      const rangeRule = mortgageQualificationValidationRules.find(r => r.field === 'borrowerCreditScore' && r.type === 'range');
      expect(rangeRule).toBeDefined();
      expect(rangeRule?.validator(299, {})).toBe(false);
      expect(rangeRule?.validator(750, {})).toBe(true);
      expect(rangeRule?.validator(851, {})).toBe(false);
    });

    it('should validate business rules', () => {
      const businessRule = mortgageQualificationValidationRules.find(r => r.field === 'loanAmount' && r.type === 'business');
      expect(businessRule).toBeDefined();
      expect(businessRule?.validator(200000, { propertyValue: 250000, downPayment: 50000 })).toBe(true);
      expect(businessRule?.validator(200000, { propertyValue: 250000, downPayment: 100000 })).toBe(false);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate debt-to-income ratio correctly', () => {
      const inputs = {
        borrowerIncome: 60000,
        coBorrowerIncome: 40000,
        monthlyPayment: 1500,
        creditCardDebt: 300,
        autoLoanDebt: 400,
        studentLoanDebt: 200,
        otherDebt: 100
      };

      const result = mortgageQualificationCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.debtToIncomeRatio).toBeDefined();
      expect(result.outputs.totalIncome).toBe(100000);
      expect(result.outputs.monthlyIncome).toBe(8333);
    });

    it('should calculate housing expense ratio correctly', () => {
      const inputs = {
        borrowerIncome: 60000,
        monthlyPayment: 1500,
        propertyTaxes: 2400,
        propertyInsurance: 1200,
        hoaFees: 300
      };

      const result = mortgageQualificationCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.housingExpenseRatio).toBeDefined();
      expect(result.outputs.totalHousingCosts).toBeDefined();
    });

    it('should determine qualification status correctly', () => {
      const inputs = {
        borrowerIncome: 60000,
        monthlyPayment: 1500,
        creditCardDebt: 300,
        autoLoanDebt: 400,
        studentLoanDebt: 200,
        otherDebt: 100,
        borrowerCreditScore: 750
      };

      const result = mortgageQualificationCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.qualificationStatus).toBeDefined();
      expect(typeof result.outputs.qualificationStatus).toBe('string');
    });

    it('should calculate maximum loan amount correctly', () => {
      const inputs = {
        borrowerIncome: 60000,
        interestRate: 6.5,
        loanTerm: 30,
        borrowerCreditScore: 750
      };

      const result = mortgageQualificationCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.maxLoanAmount).toBeDefined();
      expect(result.outputs.maxLoanAmount).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero income', () => {
      const inputs = {
        borrowerIncome: 0,
        borrowerCreditScore: 750,
        propertyValue: 250000,
        loanAmount: 200000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 50000
      };

      const result = mortgageQualificationCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.qualificationStatus).toBe('Not Qualified');
    });

    it('should handle missing co-borrower information', () => {
      const inputs = {
        borrowerIncome: 60000,
        borrowerCreditScore: 750,
        propertyValue: 250000,
        loanAmount: 200000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 50000
      };

      const result = mortgageQualificationCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.totalIncome).toBe(60000);
      expect(result.outputs.monthlyIncome).toBe(5000);
    });

    it('should handle very high debt ratios', () => {
      const inputs = {
        borrowerIncome: 60000,
        borrowerCreditScore: 750,
        propertyValue: 250000,
        loanAmount: 200000,
        interestRate: 6.5,
        loanTerm: 30,
        downPayment: 50000,
        creditCardDebt: 5000,
        autoLoanDebt: 5000,
        studentLoanDebt: 5000,
        otherDebt: 5000
      };

      const result = mortgageQualificationCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.debtToIncomeRatio).toBeGreaterThan(50);
      expect(result.outputs.qualificationStatus).toBe('Not Qualified');
    });
  });

  describe('Examples', () => {
    it('should have valid example inputs', () => {
      const example = mortgageQualificationCalculator.examples[0];
      expect(example.inputs).toBeDefined();
      expect(example.outputs).toBeDefined();
      expect(example.description).toBeDefined();
    });

    it('should calculate example correctly', () => {
      const example = mortgageQualificationCalculator.examples[0];
      const result = mortgageQualificationCalculator.formulas[0].calculate(example.inputs);
      
      expect(result.outputs.totalIncome).toBeDefined();
      expect(result.outputs.qualificationStatus).toBeDefined();
      expect(result.explanation).toBeDefined();
    });
  });

  describe('Formulas Module', () => {
    it('should export formulas array', () => {
      expect(Array.isArray(mortgageQualificationFormulas)).toBe(true);
      expect(mortgageQualificationFormulas.length).toBeGreaterThan(0);
    });

    it('should have valid formula structure', () => {
      const formula = mortgageQualificationFormulas[0];
      expect(formula.id).toBeDefined();
      expect(formula.name).toBeDefined();
      expect(formula.description).toBeDefined();
      expect(typeof formula.calculate).toBe('function');
    });
  });

  describe('Validation Module', () => {
    it('should export validation rules array', () => {
      expect(Array.isArray(mortgageQualificationValidationRules)).toBe(true);
      expect(mortgageQualificationValidationRules.length).toBeGreaterThan(0);
    });

    it('should have valid validation rule structure', () => {
      const rule = mortgageQualificationValidationRules[0];
      expect(rule.field).toBeDefined();
      expect(rule.type).toBeDefined();
      expect(rule.message).toBeDefined();
      expect(typeof rule.validator).toBe('function');
    });
  });
});