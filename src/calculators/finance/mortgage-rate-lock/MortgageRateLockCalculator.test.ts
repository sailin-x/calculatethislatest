import { describe, it, expect } from 'vitest';
import { mortgageRateLockCalculator } from './MortgageRateLockCalculator';
import { mortgageRateLockFormulas } from './formulas';
import { mortgageRateLockValidationRules } from './validation';

describe('Mortgage Rate Lock Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(mortgageRateLockCalculator.id).toBe('mortgage-rate-lock-calculator');
      expect(mortgageRateLockCalculator.title).toBe('Mortgage Rate Lock Calculator');
      expect(mortgageRateLockCalculator.category).toBe('finance');
      expect(mortgageRateLockCalculator.subcategory).toBe('Real Estate & Mortgage');
    });

    it('should have required inputs', () => {
      const requiredInputs = mortgageRateLockCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(12);
      expect(requiredInputs.map(input => input.name)).toContain('Loan Amount');
      expect(requiredInputs.map(input => input.name)).toContain('Locked Rate');
      expect(requiredInputs.map(input => input.name)).toContain('Current Market Rate');
      expect(requiredInputs.map(input => input.name)).toContain('Loan Term');
      expect(requiredInputs.map(input => input.name)).toContain('Loan Type');
      expect(requiredInputs.map(input => input.name)).toContain('Payment Type');
      expect(requiredInputs.map(input => input.name)).toContain('Lock Date');
      expect(requiredInputs.map(input => input.name)).toContain('Lock Expiration Date');
      expect(requiredInputs.map(input => input.name)).toContain('Lock Type');
      expect(requiredInputs.map(input => input.name)).toContain('Property Value');
      expect(requiredInputs.map(input => input.name)).toContain('Property Type');
      expect(requiredInputs.map(input => input.name)).toContain('Estimated Closing Date');
    });

    it('should have correct number of outputs', () => {
      expect(mortgageRateLockCalculator.outputs).toHaveLength(10);
    });

    it('should have formulas', () => {
      expect(mortgageRateLockCalculator.formulas).toHaveLength(1);
      expect(mortgageRateLockCalculator.formulas[0].id).toBe('mortgage-rate-lock-analysis');
    });

    it('should have validation rules', () => {
      expect(mortgageRateLockCalculator.validationRules).toHaveLength(25);
    });

    it('should have examples', () => {
      expect(mortgageRateLockCalculator.examples).toHaveLength(2);
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const requiredRule = mortgageRateLockValidationRules.find(r => r.field === 'loanAmount' && r.type === 'required');
      expect(requiredRule).toBeDefined();
      expect(requiredRule?.validator(0, {})).toBe(false);
      expect(requiredRule?.validator(300000, {})).toBe(true);
    });

    it('should validate range fields', () => {
      const rangeRule = mortgageRateLockValidationRules.find(r => r.field === 'lockedRate' && r.type === 'range');
      expect(rangeRule).toBeDefined();
      expect(rangeRule?.validator(-1, {})).toBe(false);
      expect(rangeRule?.validator(6.5, {})).toBe(true);
      expect(rangeRule?.validator(21, {})).toBe(false);
    });

    it('should validate business rules', () => {
      const businessRule = mortgageRateLockValidationRules.find(r => r.field === 'lockExpirationDate' && r.type === 'business');
      expect(businessRule).toBeDefined();
      expect(businessRule?.validator('2024-04-15', { lockDate: '2024-01-15' })).toBe(true);
      expect(businessRule?.validator('2024-01-10', { lockDate: '2024-01-15' })).toBe(false);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate rate difference correctly', () => {
      const inputs = {
        lockedRate: 6.5,
        currentMarketRate: 7.2
      };

      const result = mortgageRateLockCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.rateDifference).toBeDefined();
      expect(result.outputs.rateDifference).toBe(0.7);
      expect(result.outputs.rateSavings).toBe(0.7);
    });

    it('should calculate monthly payments correctly', () => {
      const inputs = {
        loanAmount: 300000,
        lockedRate: 6.5,
        currentMarketRate: 7.2,
        loanTerm: 30
      };

      const result = mortgageRateLockCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.paymentDifference).toBeDefined();
      expect(result.outputs.paymentSavings).toBeDefined();
      expect(result.outputs.lockedPayment).toBeDefined();
      expect(result.outputs.currentPayment).toBeDefined();
    });

    it('should calculate lock value correctly', () => {
      const inputs = {
        loanAmount: 300000,
        lockedRate: 6.5,
        currentMarketRate: 7.2,
        loanTerm: 30,
        lockFee: 500
      };

      const result = mortgageRateLockCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.lockValue).toBeDefined();
      expect(result.outputs.lockValue).toBeGreaterThan(0);
    });

    it('should calculate risk score correctly', () => {
      const inputs = {
        lockedRate: 6.5,
        currentMarketRate: 7.2,
        lockExpirationDate: '2024-04-15',
        marketCondition: 'growing',
        rateTrend: 'rising'
      };

      const result = mortgageRateLockCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.riskScore).toBeDefined();
      expect(result.outputs.riskScore).toBeGreaterThan(0);
      expect(result.outputs.riskScore).toBeLessThanOrEqual(100);
    });

    it('should calculate break-even point correctly', () => {
      const inputs = {
        loanAmount: 300000,
        lockedRate: 6.5,
        currentMarketRate: 7.2,
        loanTerm: 30,
        lockFee: 500
      };

      const result = mortgageRateLockCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.breakEvenPoint).toBeDefined();
      expect(result.outputs.breakEvenPoint).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero interest rates', () => {
      const inputs = {
        loanAmount: 300000,
        lockedRate: 0,
        currentMarketRate: 0,
        loanTerm: 30,
        lockFee: 0,
        lockDate: '2024-01-15',
        lockExpirationDate: '2024-04-15',
        propertyValue: 400000,
        propertyType: 'single_family',
        estimatedClosingDate: '2024-03-15',
        loanType: 'conventional',
        paymentType: 'principal_interest'
      };

      const result = mortgageRateLockCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.lockedPayment).toBe(833);
      expect(result.outputs.currentPayment).toBe(833);
      expect(result.outputs.paymentDifference).toBe(0);
    });

    it('should handle missing optional inputs', () => {
      const inputs = {
        loanAmount: 300000,
        lockedRate: 6.5,
        currentMarketRate: 7.2,
        loanTerm: 30,
        lockDate: '2024-01-15',
        lockExpirationDate: '2024-04-15',
        lockType: 'free',
        propertyValue: 400000,
        propertyType: 'single_family',
        estimatedClosingDate: '2024-03-15',
        loanType: 'conventional',
        paymentType: 'principal_interest'
      };

      const result = mortgageRateLockCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.lockValue).toBeDefined();
      expect(result.outputs.riskScore).toBeDefined();
    });

    it('should handle very high rates', () => {
      const inputs = {
        loanAmount: 300000,
        lockedRate: 18,
        currentMarketRate: 19,
        loanTerm: 30,
        lockFee: 1000,
        lockDate: '2024-01-15',
        lockExpirationDate: '2024-04-15',
        propertyValue: 400000,
        propertyType: 'single_family',
        estimatedClosingDate: '2024-03-15',
        loanType: 'conventional',
        paymentType: 'principal_interest'
      };

      const result = mortgageRateLockCalculator.formulas[0].calculate(inputs);
      expect(result.outputs.riskScore).toBeDefined();
      expect(result.outputs.lockValue).toBeDefined();
    });
  });

  describe('Examples', () => {
    it('should have valid example inputs', () => {
      const example = mortgageRateLockCalculator.examples[0];
      expect(example.inputs).toBeDefined();
      expect(example.outputs).toBeDefined();
      expect(example.description).toBeDefined();
    });

    it('should calculate example correctly', () => {
      const example = mortgageRateLockCalculator.examples[0];
      const result = mortgageRateLockCalculator.formulas[0].calculate(example.inputs);
      
      expect(result.outputs.rateDifference).toBeDefined();
      expect(result.outputs.lockRating).toBeDefined();
      expect(result.outputs.recommendation).toBeDefined();
      expect(result.explanation).toBeDefined();
    });
  });

  describe('Formulas Module', () => {
    it('should export formulas array', () => {
      expect(Array.isArray(mortgageRateLockFormulas)).toBe(true);
      expect(mortgageRateLockFormulas.length).toBeGreaterThan(0);
    });

    it('should have valid formula structure', () => {
      const formula = mortgageRateLockFormulas[0];
      expect(formula.id).toBeDefined();
      expect(formula.name).toBeDefined();
      expect(formula.description).toBeDefined();
      expect(typeof formula.calculate).toBe('function');
    });

    it('should calculate rate difference correctly', () => {
      const formula = mortgageRateLockFormulas.find(f => f.id === 'rate-difference-calculation');
      expect(formula).toBeDefined();
      
      const result = formula!.calculate({ lockedRate: 6.5, currentMarketRate: 7.2 });
      expect(result.outputs.rateDifference).toBe(0.7);
      expect(result.outputs.rateSavings).toBe(0.7);
    });

    it('should calculate payments correctly', () => {
      const formula = mortgageRateLockFormulas.find(f => f.id === 'payment-calculation');
      expect(formula).toBeDefined();
      
      const result = formula!.calculate({ 
        loanAmount: 300000, 
        lockedRate: 6.5, 
        currentMarketRate: 7.2, 
        loanTerm: 30 
      });
      expect(result.outputs.lockedPayment).toBeDefined();
      expect(result.outputs.currentPayment).toBeDefined();
      expect(result.outputs.paymentDifference).toBeDefined();
    });
  });

  describe('Validation Module', () => {
    it('should export validation rules array', () => {
      expect(Array.isArray(mortgageRateLockValidationRules)).toBe(true);
      expect(mortgageRateLockValidationRules.length).toBeGreaterThan(0);
    });

    it('should have valid validation rule structure', () => {
      const rule = mortgageRateLockValidationRules[0];
      expect(rule.field).toBeDefined();
      expect(rule.type).toBeDefined();
      expect(rule.message).toBeDefined();
      expect(typeof rule.validator).toBe('function');
    });
  });
});