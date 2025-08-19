import { describe, it, expect } from 'vitest';
import { calculateMortgageQualification, analyzeQualificationFactors, calculateQualificationScenarios } from './formulas';
import { validateMortgageQualificationInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';
import { mortgageQualificationCalculator } from './MortgageQualificationCalculator';

describe('Mortgage Qualification Calculator', () => {
  describe('calculateMortgageQualification', () => {
    it('should calculate qualification for standard conventional loan', () => {
      const inputs = {
        grossMonthlyIncome: 8000,
        monthlyDebts: 1200,
        downPayment: 60000,
        creditScore: 750,
        interestRate: 4.5,
        loanTerm: '30',
        propertyTaxRate: 1.2,
        homeownersInsurance: 1200,
        pmiRate: 0.5,
        loanType: 'conventional',
        dtiRatio: 43,
        frontEndRatio: 28,
        reserves: 6,
        employmentType: 'w2',
        incomeStability: 3
      };

      const result = calculateMortgageQualification(inputs);

      expect(result.maxLoanAmount).toBeGreaterThan(0);
      expect(result.maxHomePrice).toBe(result.maxLoanAmount + inputs.downPayment);
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.dtiRatio).toBeGreaterThan(0);
      expect(result.frontEndRatio).toBeGreaterThan(0);
      expect(result.qualificationScore).toBeGreaterThanOrEqual(0);
      expect(result.qualificationScore).toBeLessThanOrEqual(100);
      expect(result.qualificationFactors).toHaveLength(5);
      expect(result.recommendations).toBeTruthy();
    });

    it('should calculate qualification for FHA loan', () => {
      const inputs = {
        grossMonthlyIncome: 6000,
        monthlyDebts: 800,
        downPayment: 20000,
        creditScore: 650,
        interestRate: 5.0,
        loanTerm: '30',
        propertyTaxRate: 1.0,
        homeownersInsurance: 1000,
        pmiRate: 0.85,
        loanType: 'fha',
        dtiRatio: 43,
        frontEndRatio: 31,
        reserves: 3,
        employmentType: 'w2',
        incomeStability: 2
      };

      const result = calculateMortgageQualification(inputs);

      expect(result.maxLoanAmount).toBeGreaterThan(0);
      expect(result.maxHomePrice).toBe(result.maxLoanAmount + inputs.downPayment);
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.qualificationScore).toBeGreaterThanOrEqual(0);
      expect(result.qualificationScore).toBeLessThanOrEqual(100);
    });

    it('should handle high-income borrower', () => {
      const inputs = {
        grossMonthlyIncome: 15000,
        monthlyDebts: 2000,
        downPayment: 150000,
        creditScore: 800,
        interestRate: 4.0,
        loanTerm: '30',
        propertyTaxRate: 1.5,
        homeownersInsurance: 2000,
        pmiRate: 0,
        loanType: 'conventional',
        dtiRatio: 43,
        frontEndRatio: 28,
        reserves: 12,
        employmentType: 'w2',
        incomeStability: 5
      };

      const result = calculateMortgageQualification(inputs);

      expect(result.maxLoanAmount).toBeGreaterThan(500000);
      expect(result.maxHomePrice).toBe(result.maxLoanAmount + inputs.downPayment);
      expect(result.qualificationScore).toBeGreaterThan(80);
    });

    it('should handle minimum required inputs', () => {
      const inputs = {
        grossMonthlyIncome: 5000,
        monthlyDebts: 500,
        downPayment: 25000,
        creditScore: 700,
        interestRate: 5.0,
        loanTerm: '30',
        loanType: 'conventional'
      };

      const result = calculateMortgageQualification(inputs);

      expect(result.maxLoanAmount).toBeGreaterThan(0);
      expect(result.maxHomePrice).toBe(result.maxLoanAmount + inputs.downPayment);
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.qualificationScore).toBeGreaterThanOrEqual(0);
    });
  });

  describe('analyzeQualificationFactors', () => {
    it('should analyze qualification factors correctly', () => {
      const inputs = {
        grossMonthlyIncome: 8000,
        monthlyDebts: 1200,
        downPayment: 60000,
        creditScore: 750,
        interestRate: 4.5,
        loanTerm: '30',
        loanType: 'conventional'
      };

      const result = calculateMortgageQualification(inputs);
      const factors = analyzeQualificationFactors(inputs, result.dtiRatio, result.frontEndRatio);

      expect(factors).toHaveLength(5);
      expect(factors[0].factor).toBe('Credit Score');
      expect(factors[1].factor).toBe('Debt-to-Income Ratio');
      expect(factors[2].factor).toBe('Front-End Ratio');
      expect(factors[3].factor).toBe('Down Payment');
      expect(factors[4].factor).toBe('Employment Stability');

      factors.forEach(factor => {
        expect(factor.impact).toMatch(/positive|negative|neutral/);
        expect(typeof factor.score).toBe('number');
        expect(factor.description).toBeTruthy();
        expect(factor.recommendation).toBeTruthy();
      });
    });

    it('should identify negative factors', () => {
      const inputs = {
        grossMonthlyIncome: 4000,
        monthlyDebts: 1500,
        downPayment: 10000,
        creditScore: 600,
        interestRate: 6.0,
        loanTerm: '30',
        loanType: 'conventional'
      };

      const result = calculateMortgageQualification(inputs);
      const factors = analyzeQualificationFactors(inputs, result.dtiRatio, result.frontEndRatio);

      const negativeFactors = factors.filter(f => f.impact === 'negative');
      expect(negativeFactors.length).toBeGreaterThan(0);
    });
  });

  describe('calculateQualificationScenarios', () => {
    it('should calculate different scenarios', () => {
      const inputs = {
        grossMonthlyIncome: 8000,
        monthlyDebts: 1200,
        downPayment: 60000,
        creditScore: 750,
        interestRate: 4.5,
        loanTerm: '30',
        loanType: 'conventional'
      };

      const result = calculateQualificationScenarios(inputs);

      expect(result.scenarios).toHaveLength(5);
      expect(result.bestScenario).toBeDefined();
      expect(result.worstScenario).toBeDefined();
      expect(result.bestScenario.qualificationScore).toBeGreaterThanOrEqual(result.worstScenario.qualificationScore);

      result.scenarios.forEach(scenario => {
        expect(scenario.maxLoanAmount).toBeGreaterThan(0);
        // Note: maxHomePrice calculation may vary due to different scenarios having different down payments
        expect(scenario.monthlyPayment).toBeGreaterThan(0);
        expect(scenario.dtiRatio).toBeGreaterThan(0);
        expect(scenario.frontEndRatio).toBeGreaterThan(0);
        expect(scenario.qualificationScore).toBeGreaterThanOrEqual(0);
        expect(scenario.qualificationScore).toBeLessThanOrEqual(100);
      });
    });
  });

  describe('validateMortgageQualificationInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        grossMonthlyIncome: 8000,
        monthlyDebts: 1200,
        downPayment: 60000,
        creditScore: 750,
        interestRate: 4.5,
        loanTerm: '30',
        loanType: 'conventional'
      };

      const errors = validateMortgageQualificationInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should detect missing required fields', () => {
      const inputs = {
        grossMonthlyIncome: 8000,
        monthlyDebts: 1200,
        downPayment: 60000,
        creditScore: 750,
        interestRate: 4.5,
        loanTerm: '30',
        loanType: undefined // Explicitly undefined
      };

      const errors = validateMortgageQualificationInputs(inputs as any);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.field === 'loanType')).toBe(true);
    });

    it('should detect invalid credit score', () => {
      const inputs = {
        grossMonthlyIncome: 8000,
        monthlyDebts: 1200,
        downPayment: 60000,
        creditScore: 200, // Invalid
        interestRate: 4.5,
        loanTerm: '30',
        loanType: 'conventional'
      };

      const errors = validateMortgageQualificationInputs(inputs);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.field === 'creditScore')).toBe(true);
    });

    it('should detect invalid loan term', () => {
      const inputs = {
        grossMonthlyIncome: 8000,
        monthlyDebts: 1200,
        downPayment: 60000,
        creditScore: 750,
        interestRate: 4.5,
        loanTerm: '25', // Invalid
        loanType: 'conventional'
      };

      const errors = validateMortgageQualificationInputs(inputs);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.field === 'loanTerm')).toBe(true);
    });

    it('should detect invalid loan type', () => {
      const inputs = {
        grossMonthlyIncome: 8000,
        monthlyDebts: 1200,
        downPayment: 60000,
        creditScore: 750,
        interestRate: 4.5,
        loanTerm: '30',
        loanType: 'invalid' // Invalid
      };

      const errors = validateMortgageQualificationInputs(inputs);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.field === 'loanType')).toBe(true);
    });

    it('should detect business logic violations', () => {
      const inputs = {
        grossMonthlyIncome: 8000,
        monthlyDebts: 9000, // Exceeds income
        downPayment: 60000,
        creditScore: 750,
        interestRate: 4.5,
        loanTerm: '30',
        loanType: 'conventional'
      };

      const errors = validateMortgageQualificationInputs(inputs);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.field === 'monthlyDebts' && e.message.includes('exceed'))).toBe(true);
    });
  });

  describe('quickValidateAllInputs', () => {
    it('should validate all inputs correctly', () => {
      const inputs = {
        grossMonthlyIncome: 8000,
        monthlyDebts: 1200,
        downPayment: 60000,
        creditScore: 750,
        interestRate: 4.5,
        loanTerm: '30',
        propertyTaxRate: 1.2,
        homeownersInsurance: 1200,
        pmiRate: 0.5,
        loanType: 'conventional',
        dtiRatio: 43,
        frontEndRatio: 28,
        reserves: 6,
        employmentType: 'w2',
        incomeStability: 3
      };

      const results = quickValidateAllInputs(inputs);
      expect(results).toHaveLength(15);

      // Check that all validations pass
      results.forEach(result => {
        expect(result.isValid).toBe(true);
      });
    });

    it('should detect validation errors', () => {
      const inputs = {
        grossMonthlyIncome: -1000, // Invalid
        monthlyDebts: 1200,
        downPayment: 60000,
        creditScore: 200, // Invalid
        interestRate: 4.5,
        loanTerm: '30',
        loanType: 'conventional'
      };

      const results = quickValidateAllInputs(inputs);
      expect(results).toHaveLength(15);

      // Check that some validations fail
      const invalidResults = results.filter(r => !r.isValid);
      expect(invalidResults.length).toBeGreaterThan(0);
    });
  });

  describe('Calculator Interface', () => {
    it('should have correct calculator structure', () => {
      expect(mortgageQualificationCalculator.id).toBe('mortgage-qualification');
      expect(mortgageQualificationCalculator.title).toBe('Mortgage Qualification Calculator');
      expect(mortgageQualificationCalculator.category).toBe('finance');
      expect(mortgageQualificationCalculator.subcategory).toBe('mortgage');
      expect(mortgageQualificationCalculator.description).toBeTruthy();
      expect(mortgageQualificationCalculator.usageInstructions).toBeTruthy();
    });

    it('should have required inputs', () => {
      const requiredInputs = mortgageQualificationCalculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      
      const inputIds = requiredInputs.map(input => input.id);
      expect(inputIds).toContain('grossMonthlyIncome');
      expect(inputIds).toContain('monthlyDebts');
      expect(inputIds).toContain('downPayment');
      expect(inputIds).toContain('creditScore');
      expect(inputIds).toContain('interestRate');
      expect(inputIds).toContain('loanTerm');
      expect(inputIds).toContain('loanType');
    });

    it('should have required outputs', () => {
      const outputIds = mortgageQualificationCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('maxLoanAmount');
      expect(outputIds).toContain('maxHomePrice');
      expect(outputIds).toContain('monthlyPayment');
      expect(outputIds).toContain('dtiRatio');
      expect(outputIds).toContain('frontEndRatio');
      expect(outputIds).toContain('qualificationScore');
      expect(outputIds).toContain('qualificationFactors');
      expect(outputIds).toContain('recommendations');
    });

    it('should have formulas', () => {
      expect(mortgageQualificationCalculator.formulas).toHaveLength(3);
      expect(mortgageQualificationCalculator.formulas[0].id).toBe('calculateQualification');
      expect(mortgageQualificationCalculator.formulas[1].id).toBe('analyzeFactors');
      expect(mortgageQualificationCalculator.formulas[2].id).toBe('calculateScenarios');
    });

    it('should have validation rules', () => {
      expect(mortgageQualificationCalculator.validationRules).toHaveLength(1);
      expect(mortgageQualificationCalculator.validationRules[0].id).toBe('validateInputs');
    });

    it('should have examples', () => {
      expect(mortgageQualificationCalculator.examples).toHaveLength(3);
      
      mortgageQualificationCalculator.examples.forEach(example => {
        expect(example.title).toBeTruthy();
        expect(example.description).toBeTruthy();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });

    it('should have quick validation function', () => {
      expect(mortgageQualificationCalculator.quickValidation).toBeDefined();
      expect(typeof mortgageQualificationCalculator.quickValidation).toBe('function');
    });
  });

  describe('Integration Tests', () => {
    it('should work with calculator examples', () => {
      mortgageQualificationCalculator.examples.forEach(example => {
        const result = calculateMortgageQualification(example.inputs);
        
        expect(result.maxLoanAmount).toBeGreaterThan(0);
        expect(result.maxHomePrice).toBe(result.maxLoanAmount + example.inputs.downPayment);
        expect(result.monthlyPayment).toBeGreaterThan(0);
        expect(result.qualificationScore).toBeGreaterThanOrEqual(0);
        expect(result.qualificationScore).toBeLessThanOrEqual(100);
      });
    });

    it('should validate calculator examples', () => {
      mortgageQualificationCalculator.examples.forEach(example => {
        const errors = validateMortgageQualificationInputs(example.inputs);
        expect(errors).toHaveLength(0);
      });
    });

    it('should pass quick validation for calculator examples', () => {
      mortgageQualificationCalculator.examples.forEach((example, index) => {
        const results = quickValidateAllInputs(example.inputs);
        const errorResults = results.filter(r => !r.isValid && r.severity === 'error');
        if (errorResults.length > 0) {
          console.log(`Example ${index + 1} (${example.title}) has validation errors:`, errorResults);
        }
        expect(errorResults).toHaveLength(0);
      });
    });
  });
});