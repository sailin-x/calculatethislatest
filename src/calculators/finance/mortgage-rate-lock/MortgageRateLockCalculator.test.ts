import { describe, it, expect } from 'vitest';
import { calculateRateLockAnalysis, analyzeLockStrategies, calculateLockScenarios } from './formulas';
import { validateMortgageRateLockInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';
import { mortgageRateLockCalculator } from './MortgageRateLockCalculator';

describe('Mortgage Rate Lock Calculator', () => {
  describe('calculateRateLockAnalysis', () => {
    it('should calculate rate lock analysis for standard conventional loan', () => {
      const inputs = {
        loanAmount: 300000,
        interestRate: 4.5,
        loanTerm: '30',
        lockPeriod: '30',
        lockFee: 500,
        lockExtensionFee: 25,
        processingTime: 45,
        rateVolatility: 25,
        marketTrend: 'rising',
        propertyType: 'primary',
        loanType: 'conventional',
        creditScore: 750,
        downPayment: 60000
      };

      const result = calculateRateLockAnalysis(inputs);

      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalInterest).toBeGreaterThan(0);
      expect(result.lockCost).toBeGreaterThanOrEqual(500);
      expect(result.potentialSavings).toBeGreaterThanOrEqual(0);
      expect(result.breakEvenDays).toBeGreaterThan(0);
      expect(result.riskAnalysis).toBeTruthy();
      expect(result.recommendations).toBeTruthy();
    });

    it('should calculate rate lock analysis for FHA loan', () => {
      const inputs = {
        loanAmount: 250000,
        interestRate: 5.0,
        loanTerm: '30',
        lockPeriod: '60',
        lockFee: 750,
        lockExtensionFee: 30,
        processingTime: 60,
        rateVolatility: 30,
        marketTrend: 'stable',
        propertyType: 'primary',
        loanType: 'fha',
        creditScore: 680,
        downPayment: 8750
      };

      const result = calculateRateLockAnalysis(inputs);

      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalInterest).toBeGreaterThan(0);
      expect(result.lockCost).toBeGreaterThanOrEqual(750);
      expect(result.potentialSavings).toBeGreaterThanOrEqual(0);
      expect(result.breakEvenDays).toBeGreaterThan(0);
    });

    it('should handle investment property with high volatility', () => {
      const inputs = {
        loanAmount: 400000,
        interestRate: 5.5,
        loanTerm: '30',
        lockPeriod: '90',
        lockFee: 1000,
        lockExtensionFee: 40,
        processingTime: 75,
        rateVolatility: 50,
        marketTrend: 'rising',
        propertyType: 'investment',
        loanType: 'conventional',
        creditScore: 720,
        downPayment: 80000
      };

      const result = calculateRateLockAnalysis(inputs);

      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalInterest).toBeGreaterThan(0);
      expect(result.lockCost).toBeGreaterThanOrEqual(1000);
      expect(result.potentialSavings).toBeGreaterThanOrEqual(0);
      expect(result.breakEvenDays).toBeGreaterThan(0);
    });

    it('should handle minimum required inputs', () => {
      const inputs = {
        loanAmount: 200000,
        interestRate: 4.0,
        loanTerm: '30',
        lockPeriod: '30',
        processingTime: 30,
        loanType: 'conventional'
      };

      const result = calculateRateLockAnalysis(inputs);

      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalInterest).toBeGreaterThan(0);
      expect(result.lockCost).toBeGreaterThanOrEqual(0);
      expect(result.potentialSavings).toBeGreaterThanOrEqual(0);
      expect(result.breakEvenDays).toBeGreaterThanOrEqual(0);
    });
  });

  describe('analyzeLockStrategies', () => {
    it('should analyze different lock strategies', () => {
      const inputs = {
        loanAmount: 300000,
        interestRate: 4.5,
        loanTerm: '30',
        lockPeriod: '30',
        lockFee: 500,
        lockExtensionFee: 25,
        processingTime: 45,
        loanType: 'conventional'
      };

      const strategies = analyzeLockStrategies(inputs);

      expect(strategies).toHaveLength(3);
      expect(strategies[0].scenario).toBe('Current Lock Period');
      expect(strategies[1].scenario).toBe('Shorter Lock Period');
      expect(strategies[2].scenario).toBe('Longer Lock Period');

      strategies.forEach(strategy => {
        expect(strategy.lockPeriod).toBeGreaterThan(0);
        expect(strategy.lockCost).toBeGreaterThanOrEqual(0);
        expect(strategy.potentialSavings).toBeGreaterThanOrEqual(0);
        expect(strategy.breakEvenDays).toBeGreaterThan(0);
        expect(['low', 'medium', 'high']).toContain(strategy.riskLevel);
        expect(strategy.recommendation).toBeTruthy();
      });
    });

    it('should identify best and worst scenarios', () => {
      const inputs = {
        loanAmount: 300000,
        interestRate: 4.5,
        loanTerm: '30',
        lockPeriod: '30',
        lockFee: 500,
        lockExtensionFee: 25,
        processingTime: 45,
        loanType: 'conventional'
      };

      const result = calculateLockScenarios(inputs);

      expect(result.scenarios).toHaveLength(3);
      expect(result.bestScenario).toBeDefined();
      expect(result.worstScenario).toBeDefined();
      expect(result.bestScenario).toBe(result.scenarios[0]);
      expect(result.worstScenario).toBe(result.scenarios[2]);
    });
  });

  describe('validateMortgageRateLockInputs', () => {
    it('should validate valid inputs', () => {
      const inputs = {
        loanAmount: 300000,
        interestRate: 4.5,
        loanTerm: '30',
        lockPeriod: '30',
        processingTime: 45,
        loanType: 'conventional'
      };

      const errors = validateMortgageRateLockInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should detect missing required fields', () => {
      const inputs = {
        loanAmount: 300000,
        interestRate: 4.5,
        loanTerm: '30',
        lockPeriod: '30',
        processingTime: 45
        // Missing loanType
      };

      const errors = validateMortgageRateLockInputs(inputs as any);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.field === 'loanType')).toBe(true);
    });

    it('should detect invalid loan amount', () => {
      const inputs = {
        loanAmount: -1000, // Invalid
        interestRate: 4.5,
        loanTerm: '30',
        lockPeriod: '30',
        processingTime: 45,
        loanType: 'conventional'
      };

      const errors = validateMortgageRateLockInputs(inputs);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.field === 'loanAmount')).toBe(true);
    });

    it('should detect invalid interest rate', () => {
      const inputs = {
        loanAmount: 300000,
        interestRate: 25, // Invalid
        loanTerm: '30',
        lockPeriod: '30',
        processingTime: 45,
        loanType: 'conventional'
      };

      const errors = validateMortgageRateLockInputs(inputs);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.field === 'interestRate')).toBe(true);
    });

    it('should detect invalid lock period', () => {
      const inputs = {
        loanAmount: 300000,
        interestRate: 4.5,
        loanTerm: '30',
        lockPeriod: '25', // Invalid
        processingTime: 45,
        loanType: 'conventional'
      };

      const errors = validateMortgageRateLockInputs(inputs);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.field === 'lockPeriod')).toBe(true);
    });

    it('should detect invalid processing time', () => {
      const inputs = {
        loanAmount: 300000,
        interestRate: 4.5,
        loanTerm: '30',
        lockPeriod: '30',
        processingTime: 5, // Invalid
        loanType: 'conventional'
      };

      const errors = validateMortgageRateLockInputs(inputs);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.field === 'processingTime')).toBe(true);
    });

    it('should detect business logic violations', () => {
      const inputs = {
        loanAmount: 300000,
        interestRate: 4.5,
        loanTerm: '30',
        lockPeriod: '30',
        processingTime: 90, // Exceeds lock period significantly
        loanType: 'conventional'
      };

      const errors = validateMortgageRateLockInputs(inputs);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.field === 'processingTime' && e.severity === 'warning')).toBe(true);
    });
  });

  describe('quickValidateAllInputs', () => {
    it('should validate all inputs correctly', () => {
      const inputs = {
        loanAmount: 300000,
        interestRate: 4.5,
        loanTerm: '30',
        lockPeriod: '30',
        lockFee: 500,
        lockExtensionFee: 25,
        processingTime: 45,
        rateVolatility: 25,
        marketTrend: 'rising',
        propertyType: 'primary',
        loanType: 'conventional',
        creditScore: 750,
        downPayment: 60000
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
        loanAmount: -1000, // Invalid
        interestRate: 4.5,
        loanTerm: '30',
        lockPeriod: '30',
        processingTime: 45,
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
      expect(mortgageRateLockCalculator.id).toBe('mortgage-rate-lock');
      expect(mortgageRateLockCalculator.title).toBe('Mortgage Rate Lock Calculator');
      expect(mortgageRateLockCalculator.category).toBe('finance');
      expect(mortgageRateLockCalculator.subcategory).toBe('mortgage');
      expect(mortgageRateLockCalculator.description).toBeTruthy();
      expect(mortgageRateLockCalculator.usageInstructions).toBeTruthy();
    });

    it('should have required inputs', () => {
      const requiredInputs = mortgageRateLockCalculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      
      const inputIds = requiredInputs.map(input => input.id);
      expect(inputIds).toContain('loanAmount');
      expect(inputIds).toContain('interestRate');
      expect(inputIds).toContain('loanTerm');
      expect(inputIds).toContain('lockPeriod');
      expect(inputIds).toContain('processingTime');
      expect(inputIds).toContain('loanType');
    });

    it('should have required outputs', () => {
      const outputIds = mortgageRateLockCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('monthlyPayment');
      expect(outputIds).toContain('totalInterest');
      expect(outputIds).toContain('lockCost');
      expect(outputIds).toContain('potentialSavings');
      expect(outputIds).toContain('breakEvenDays');
      expect(outputIds).toContain('riskAnalysis');
      expect(outputIds).toContain('recommendations');
      expect(outputIds).toContain('lockScenarios');
    });

    it('should have formulas', () => {
      expect(mortgageRateLockCalculator.formulas).toHaveLength(3);
      expect(mortgageRateLockCalculator.formulas[0].id).toBe('calculateRateLock');
      expect(mortgageRateLockCalculator.formulas[1].id).toBe('analyzeStrategies');
      expect(mortgageRateLockCalculator.formulas[2].id).toBe('calculateScenarios');
    });

    it('should have validation rules', () => {
      expect(mortgageRateLockCalculator.validationRules).toHaveLength(1);
      expect(mortgageRateLockCalculator.validationRules[0].id).toBe('validateInputs');
    });

    it('should have examples', () => {
      expect(mortgageRateLockCalculator.examples).toHaveLength(3);
      
      mortgageRateLockCalculator.examples.forEach(example => {
        expect(example.title).toBeTruthy();
        expect(example.description).toBeTruthy();
        expect(example.inputs).toBeDefined();
        expect(example.expectedOutputs).toBeDefined();
      });
    });

    it('should have quick validation function', () => {
      expect(mortgageRateLockCalculator.quickValidation).toBeDefined();
      expect(typeof mortgageRateLockCalculator.quickValidation).toBe('function');
    });
  });

  describe('Integration Tests', () => {
    it('should work with calculator examples', () => {
      mortgageRateLockCalculator.examples.forEach(example => {
        const result = calculateRateLockAnalysis(example.inputs);
        
        expect(result.monthlyPayment).toBeGreaterThan(0);
        expect(result.totalInterest).toBeGreaterThan(0);
        expect(result.lockCost).toBeGreaterThanOrEqual(0);
        expect(result.potentialSavings).toBeGreaterThanOrEqual(0);
        expect(result.breakEvenDays).toBeGreaterThan(0);
      });
    });

    it('should validate calculator examples', () => {
      mortgageRateLockCalculator.examples.forEach(example => {
        const errors = validateMortgageRateLockInputs(example.inputs);
        expect(errors).toHaveLength(0);
      });
    });

    it('should pass quick validation for calculator examples', () => {
      mortgageRateLockCalculator.examples.forEach((example, index) => {
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