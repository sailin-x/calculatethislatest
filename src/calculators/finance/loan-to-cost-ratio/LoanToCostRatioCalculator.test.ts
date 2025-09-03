import { describe, it, expect } from 'vitest';
import { loanToCostRatioCalculator } from './LoanToCostRatioCalculator';

describe('Loan to Cost Ratio Calculator', () => {
  describe('Calculator Definition', () => {
    it('should have correct basic properties', () => {
      expect(loanToCostRatioCalculator.id).toBe('loan-to-cost-ratio');
      expect(loanToCostRatioCalculator.title).toBe('Loan to Cost (LTC) Ratio Calculator');
      expect(loanToCostRatioCalculator.category).toBe('finance');
      expect(loanToCostRatioCalculator.subcategory).toBe('Real Estate & Investment');
      expect(loanToCostRatioCalculator.description).toContain('Calculate the Loan to Cost ratio');
    });

    it('should have usage instructions', () => {
      expect(loanToCostRatioCalculator.usageInstructions).toHaveLength(6);
      expect(loanToCostRatioCalculator.usageInstructions[0]).toContain('project information');
    });

    it('should have required inputs', () => {
      const requiredInputs = loanToCostRatioCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(9);
      
      const inputIds = loanToCostRatioCalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('projectName');
      expect(inputIds).toContain('totalProjectCost');
      expect(inputIds).toContain('requestedLoanAmount');
      expect(inputIds).toContain('interestRate');
    });

    it('should have correct output structure', () => {
      const outputIds = loanToCostRatioCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('ltcRatio');
      expect(outputIds).toContain('equityRequirement');
      expect(outputIds).toContain('monthlyPayment');
      expect(outputIds).toContain('riskScore');
      expect(outputIds).toContain('breakEvenRent');
    });

    it('should have formulas', () => {
      expect(loanToCostRatioCalculator.formulas).toHaveLength(1);
      expect(loanToCostRatioCalculator.formulas[0].id).toBe('ltc-ratio');
      expect(loanToCostRatioCalculator.formulas[0].name).toBe('LTC Ratio Calculation');
    });

    it('should have validation rules', () => {
      expect(loanToCostRatioCalculator.validationRules).toHaveLength(3);
      
      const validationTypes = loanToCostRatioCalculator.validationRules.map(rule => rule.type);
      expect(validationTypes).toContain('required');
      expect(validationTypes).toContain('business');
    });

    it('should have examples', () => {
      expect(loanToCostRatioCalculator.examples).toHaveLength(2);
      expect(loanToCostRatioCalculator.examples[0].title).toBe('Commercial Office Development');
      expect(loanToCostRatioCalculator.examples[1].title).toBe('Multifamily Development');
    });
  });

  describe('Formula Calculations', () => {
    it('should calculate LTC ratio correctly', () => {
      const formula = loanToCostRatioCalculator.formulas[0];
      const inputs = {
        totalProjectCost: 1000000,
        requestedLoanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 24
      };

      const result = formula.calculate(inputs);
      
      expect(result.outputs.ltcRatio).toBe(75);
      expect(result.outputs.equityRequirement).toBe(250000);
      expect(result.outputs.monthlyPayment).toBeGreaterThan(0);
      expect(result.outputs.riskScore).toBeGreaterThan(0);
      expect(result.outputs.breakEvenRent).toBeGreaterThan(0);
      expect(result.explanation).toContain('75.00%');
    });

    it('should handle zero total project cost', () => {
      const formula = loanToCostRatioCalculator.formulas[0];
      const inputs = {
        totalProjectCost: 0,
        requestedLoanAmount: 100000,
        interestRate: 6.5,
        loanTerm: 24
      };

      const result = formula.calculate(inputs);
      
      expect(result.outputs.ltcRatio).toBe(0);
      expect(result.outputs.equityRequirement).toBe(-100000);
    });

    it('should calculate risk score based on project type', () => {
      const formula = loanToCostRatioCalculator.formulas[0];
      
      // Test low risk project
      const lowRiskInputs = {
        totalProjectCost: 1000000,
        requestedLoanAmount: 650000, // 65% LTC
        projectType: 'office',
        constructionDuration: 18,
        interestRate: 6.5,
        loanTerm: 24
      };
      
      const lowRiskResult = formula.calculate(lowRiskInputs);
      
      // Test high risk project
      const highRiskInputs = {
        totalProjectCost: 1000000,
        requestedLoanAmount: 900000, // 90% LTC
        projectType: 'hospitality',
        constructionDuration: 42,
        interestRate: 6.5,
        loanTerm: 24
      };
      
      const highRiskResult = formula.calculate(highRiskInputs);
      
      expect(highRiskResult.outputs.riskScore).toBeGreaterThan(lowRiskResult.outputs.riskScore);
    });

    it('should calculate monthly payment correctly', () => {
      const formula = loanToCostRatioCalculator.formulas[0];
      const inputs = {
        totalProjectCost: 1000000,
        requestedLoanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 24
      };

      const result = formula.calculate(inputs);
      
      // Monthly payment should be positive and reasonable
      expect(result.outputs.monthlyPayment).toBeGreaterThan(0);
      expect(result.outputs.monthlyPayment).toBeLessThan(750000); // Should be less than loan amount
    });
  });

  describe('Validation Rules', () => {
    it('should validate required fields', () => {
      const requiredRule = loanToCostRatioCalculator.validationRules.find(rule => rule.type === 'required' && rule.field === 'totalProjectCost');
      expect(requiredRule).toBeDefined();
      
      if (requiredRule) {
        expect(requiredRule.validator(1000000)).toBe(true);
        expect(requiredRule.validator(0)).toBe(false);
        expect(requiredRule.validator(null)).toBe(false);
        expect(requiredRule.validator(undefined)).toBe(false);
      }
    });

    it('should validate business rules', () => {
      const businessRule = loanToCostRatioCalculator.validationRules.find(rule => rule.type === 'business' && rule.field === 'requestedLoanAmount');
      expect(businessRule).toBeDefined();
      
      if (businessRule) {
        const allInputs = { totalProjectCost: 1000000 };
        expect(businessRule.validator(750000, allInputs)).toBe(true);
        expect(businessRule.validator(1000000, allInputs)).toBe(true);
        expect(businessRule.validator(1100000, allInputs)).toBe(false);
      }
    });

    it('should validate with allInputs parameter', () => {
      const businessRule = loanToCostRatioCalculator.validationRules.find(rule => rule.type === 'business');
      expect(businessRule).toBeDefined();
      
      if (businessRule) {
        const allInputs = { totalProjectCost: 1000000 };
        expect(businessRule.validator(750000, allInputs)).toBe(true);
        expect(businessRule.validator(1100000, allInputs)).toBe(false);
      }
    });
  });

  describe('Examples', () => {
    it('should have valid example inputs', () => {
      const example = loanToCostRatioCalculator.examples[0];
      
      expect(example.inputs.projectName).toBe('downtown-office');
      expect(example.inputs.totalProjectCost).toBe(15000000);
      expect(example.inputs.requestedLoanAmount).toBe(12000000);
      expect(example.inputs.interestRate).toBe(6.5);
    });

    it('should have expected outputs in examples', () => {
      const example = loanToCostRatioCalculator.examples[0];
      
      expect(example.expectedOutputs.ltcRatio).toBe(80);
      expect(example.expectedOutputs.equityRequirement).toBe(3000000);
      expect(example.expectedOutputs.monthlyPayment).toBe(540000);
    });

    it('should have consistent example structure', () => {
      loanToCostRatioCalculator.examples.forEach(example => {
        expect(example).toHaveProperty('title');
        expect(example).toHaveProperty('description');
        expect(example).toHaveProperty('inputs');
        expect(example).toHaveProperty('expectedOutputs');
        
        expect(typeof example.title).toBe('string');
        expect(typeof example.description).toBe('string');
        expect(typeof example.inputs).toBe('object');
        expect(typeof example.expectedOutputs).toBe('object');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle very high interest rates', () => {
      const formula = loanToCostRatioCalculator.formulas[0];
      const inputs = {
        totalProjectCost: 1000000,
        requestedLoanAmount: 750000,
        interestRate: 25.0, // Very high rate
        loanTerm: 24
      };

      const result = formula.calculate(inputs);
      
      expect(result.outputs.monthlyPayment).toBeGreaterThan(0);
      expect(result.outputs.riskScore).toBeGreaterThan(50); // Should be high risk
    });

    it('should handle very long loan terms', () => {
      const formula = loanToCostRatioCalculator.formulas[0];
      const inputs = {
        totalProjectCost: 1000000,
        requestedLoanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 360 // 30 years
      };

      const result = formula.calculate(inputs);
      
      expect(result.outputs.monthlyPayment).toBeGreaterThan(0);
      expect(result.outputs.monthlyPayment).toBeLessThan(10000); // Should be reasonable
    });

    it('should handle zero interest rate', () => {
      const formula = loanToCostRatioCalculator.formulas[0];
      const inputs = {
        totalProjectCost: 1000000,
        requestedLoanAmount: 750000,
        interestRate: 0,
        loanTerm: 24
      };

      const result = formula.calculate(inputs);
      
      expect(result.outputs.monthlyPayment).toBe(0);
      expect(result.outputs.breakEvenRent).toBe(0);
    });
  });

  describe('Integration', () => {
    it('should provide consistent results for same inputs', () => {
      const formula = loanToCostRatioCalculator.formulas[0];
      const inputs = {
        totalProjectCost: 1000000,
        requestedLoanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 24
      };

      const result1 = formula.calculate(inputs);
      const result2 = formula.calculate(inputs);

      expect(result1.outputs.ltcRatio).toBe(result2.outputs.ltcRatio);
      expect(result1.outputs.equityRequirement).toBe(result2.outputs.equityRequirement);
      expect(result1.outputs.monthlyPayment).toBe(result2.outputs.monthlyPayment);
    });

    it('should handle all required input combinations', () => {
      const formula = loanToCostRatioCalculator.formulas[0];
      
      // Test with minimal required inputs
      const minimalInputs = {
        totalProjectCost: 1000000,
        requestedLoanAmount: 750000,
        interestRate: 6.5,
        loanTerm: 24
      };

      const result = formula.calculate(minimalInputs);
      
      expect(result.outputs).toBeDefined();
      expect(result.outputs.ltcRatio).toBe(75);
      expect(result.explanation).toBeDefined();
    });
  });
});
