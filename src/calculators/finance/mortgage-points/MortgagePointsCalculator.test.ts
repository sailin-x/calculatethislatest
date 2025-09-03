import { describe, it, expect } from 'vitest';
import { mortgagePointsCalculator } from './MortgagePointsCalculator';
import { mortgagePointsFormulas } from './formulas';
import { mortgagePointsValidationRules } from './validation';

describe('Mortgage Points Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(mortgagePointsCalculator.id).toBe('mortgage-points-calculator');
      expect(mortgagePointsCalculator.title).toBe('Mortgage Points Calculator');
      expect(mortgagePointsCalculator.category).toBe('finance');
      expect(mortgagePointsCalculator.subcategory).toBe('Real Estate & Mortgage');
    });

    it('should have required inputs', () => {
      const requiredInputs = mortgagePointsCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(3);
      expect(requiredInputs.map(input => input.id)).toContain('loanAmount');
      expect(requiredInputs.map(input => input.id)).toContain('baseInterestRate');
      expect(requiredInputs.map(input => input.id)).toContain('loanTerm');
    });

    it('should have correct number of inputs', () => {
      expect(mortgagePointsCalculator.inputs).toHaveLength(13);
    });

    it('should have correct number of outputs', () => {
      expect(mortgagePointsCalculator.outputs).toHaveLength(10);
    });

    it('should have formulas', () => {
      expect(mortgagePointsCalculator.formulas).toHaveLength(1);
      expect(mortgagePointsCalculator.formulas[0].id).toBe('mortgage-points-analysis');
    });

    it('should have validation rules', () => {
      expect(mortgagePointsCalculator.validationRules).toHaveLength(9);
    });

    it('should have examples', () => {
      expect(mortgagePointsCalculator.examples).toHaveLength(2);
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const loanAmountRule = mortgagePointsCalculator.validationRules.find(r => r.field === 'loanAmount');
      expect(loanAmountRule?.validator(0)).toBe(false);
      expect(loanAmountRule?.validator(100000)).toBe(true);
      expect(loanAmountRule?.validator(null)).toBe(false);
      expect(loanAmountRule?.validator(undefined)).toBe(false);
    });

    it('should validate range fields', () => {
      const discountPointsRule = mortgagePointsCalculator.validationRules.find(r => r.field === 'discountPoints');
      expect(discountPointsRule?.validator(6)).toBe(false);
      expect(discountPointsRule?.validator(2)).toBe(true);
      expect(discountPointsRule?.validator(null)).toBe(true);
    });

    it('should validate business rules', () => {
      const businessRule = mortgagePointsCalculator.validationRules.find(r => r.type === 'business');
      expect(businessRule).toBeDefined();
      
      // Test loan amount vs property value validation
      const inputs = { loanAmount: 300000, propertyValue: 375000 };
      expect(businessRule?.validator(300000, inputs)).toBe(true);
      
      const invalidInputs = { loanAmount: 400000, propertyValue: 375000 };
      expect(businessRule?.validator(400000, invalidInputs)).toBe(false);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate effective rate correctly', () => {
      const inputs = {
        loanAmount: 300000,
        baseInterestRate: 6.5,
        loanTerm: 30,
        discountPoints: 1.0
      };
      
      const result = mortgagePointsCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.effectiveRate).toBe(6.25);
      expect(result.outputs.totalPoints).toBe(1.0);
      expect(result.outputs.totalPointCost).toBe(1000);
    });

    it('should calculate monthly payment savings correctly', () => {
      const inputs = {
        loanAmount: 300000,
        baseInterestRate: 6.5,
        loanTerm: 30,
        discountPoints: 1.0,
        pointCost: 1000
      };
      
      const result = mortgagePointsCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.monthlyPaymentSavings).toBeGreaterThan(0);
      expect(result.outputs.totalInterestSavings).toBeGreaterThan(0);
    });

    it('should calculate break-even analysis correctly', () => {
      const inputs = {
        loanAmount: 300000,
        baseInterestRate: 6.5,
        loanTerm: 30,
        discountPoints: 1.0,
        pointCost: 1000
      };
      
      const result = mortgagePointsCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.breakEvenYears).toBeGreaterThan(0);
      expect(result.outputs.breakEvenMonths).toBeGreaterThan(0);
    });

    it('should calculate ROI correctly', () => {
      const inputs = {
        loanAmount: 300000,
        baseInterestRate: 6.5,
        loanTerm: 30,
        discountPoints: 1.0,
        pointCost: 1000,
        analysisPeriod: 7
      };
      
      const result = mortgagePointsCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.roi).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero discount points', () => {
      const inputs = {
        loanAmount: 300000,
        baseInterestRate: 6.5,
        loanTerm: 30,
        discountPoints: 0
      };
      
      const result = mortgagePointsCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.totalPoints).toBe(0);
      expect(result.outputs.totalPointCost).toBe(0);
      expect(result.outputs.effectiveRate).toBe(6.5);
    });

    it('should handle zero interest rate', () => {
      const inputs = {
        loanAmount: 300000,
        baseInterestRate: 0,
        loanTerm: 30,
        discountPoints: 1.0
      };
      
      const result = mortgagePointsCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.effectiveRate).toBe(0);
    });

    it('should handle very high discount points', () => {
      const inputs = {
        loanAmount: 300000,
        baseInterestRate: 6.5,
        loanTerm: 30,
        discountPoints: 4.0
      };
      
      const result = mortgagePointsCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.effectiveRate).toBeGreaterThan(0);
    });
  });

  describe('Examples', () => {
    it('should have valid example inputs', () => {
      const example = mortgagePointsCalculator.examples[0];
      expect(example.inputs.loanAmount).toBe(300000);
      expect(example.inputs.baseInterestRate).toBe(6.5);
      expect(example.inputs.loanTerm).toBe(30);
      expect(example.inputs.discountPoints).toBe(1.0);
    });

    it('should have matching expected outputs', () => {
      const example = mortgagePointsCalculator.examples[0];
      const result = mortgagePointsCalculator.formulas[0].calculate(example.inputs);
      
      expect(result.outputs.totalPoints).toBe(example.expectedOutputs.totalPoints);
      expect(result.outputs.totalPointCost).toBe(example.expectedOutputs.totalPointCost);
      expect(result.outputs.effectiveRate).toBe(example.expectedOutputs.effectiveRate);
    });
  });

  describe('Formulas Module', () => {
    it('should export individual formulas', () => {
      expect(mortgagePointsFormulas).toHaveLength(5);
      expect(mortgagePointsFormulas[0].id).toBe('effective-rate-calculation');
      expect(mortgagePointsFormulas[1].id).toBe('monthly-payment-savings');
      expect(mortgagePointsFormulas[2].id).toBe('break-even-analysis');
      expect(mortgagePointsFormulas[3].id).toBe('roi-calculation');
      expect(mortgagePointsFormulas[4].id).toBe('total-interest-savings');
    });

    it('should calculate individual formulas correctly', () => {
      const inputs = { baseInterestRate: 6.5, discountPoints: 1.0 };
      
      const effectiveRate = mortgagePointsFormulas[0].calculate(inputs);
      expect(effectiveRate.outputs.effectiveRate).toBe(6.25);
      
      const monthlySavings = mortgagePointsFormulas[1].calculate(inputs);
      expect(monthlySavings.outputs.monthlyPaymentSavings).toBeGreaterThan(0);
    });
  });

  describe('Validation Module', () => {
    it('should export validation rules', () => {
      expect(mortgagePointsValidationRules).toHaveLength(20);
    });

    it('should have required field validations', () => {
      const requiredRules = mortgagePointsValidationRules.filter(r => r.type === 'required');
      expect(requiredRules).toHaveLength(3);
    });

    it('should have range validations', () => {
      const rangeRules = mortgagePointsValidationRules.filter(r => r.type === 'range');
      expect(rangeRules).toHaveLength(12);
    });

    it('should have business rule validations', () => {
      const businessRules = mortgagePointsValidationRules.filter(r => r.type === 'business');
      expect(businessRules).toHaveLength(5);
    });
  });
});