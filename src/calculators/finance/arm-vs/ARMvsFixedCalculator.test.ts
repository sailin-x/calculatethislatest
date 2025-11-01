import { ARMvsFixedCalculator } from './ARMvsFixedCalculator';
import { validateARMvsFixedInputs } from './quickValidation';

describe('ARM vs Fixed Mortgage Calculator', () => {
  const calculator = ARMvsFixedCalculator;

  describe('Basic Functionality', () => {
    test('should have correct calculator metadata', () => {
      expect(calculator.id).toBe('ArmVsFixed-mortgage');
      expect(calculator.name).toBe('ARM vs. Fixed Mortgage Calculator');
      expect(calculator.category).toBe('finance');
      expect(calculator.tags).toContain('mortgage');
      expect(calculator.tags).toContain('arm');
      expect(calculator.tags).toContain('comparison');
    });

    test('should have required inputs', () => {
      const requiredInputs = calculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      
      const inputIds = calculator.inputs.map(input => input.id);
      expect(inputIds).toContain('loanAmount');
      expect(inputIds).toContain('fixedRate');
      expect(inputIds).toContain('armInitialRate');
      expect(inputIds).toContain('armInitialPeriod');
      expect(inputIds).toContain('loanTerm');
      expect(inputIds).toContain('armMargin');
      expect(inputIds).toContain('currentIndexRate');
    });

    test('should have expected outputs', () => {
      const outputIds = calculator.outputs.map(output => output.id);
      expect(outputIds).toContain('fixedPayment');
      expect(outputIds).toContain('armInitialPayment');
      expect(outputIds).toContain('initialSavings');
      expect(outputIds).toContain('breakEvenRate');
      expect(outputIds).toContain('totalCostComparison');
      expect(outputIds).toContain('recommendation');
      expect(outputIds).toContain('riskAnalysis');
    });
  });

  describe('Calculation Tests', () => {
    const validInputs = {
      loanAmount: '400000',
      fixedRate: '4.75',
      armInitialRate: '3.5',
      armInitialPeriod: '5',
      loanTerm: '30',
      armMargin: '2.25',
      currentIndexRate: '2.5',
      armPeriodicCap: '2',
      armLifetimeCap: '5',
      expectedIndexTrend: '0.5',
      planToStayYears: '7',
      riskTolerance: 'moderate'
    };

    test('should calculate basic payments correctly', () => {
      const result = calculator.calculate(validInputs);
      
      expect(result.fixedPayment.value).toBeGreaterThan(0);
      expect(result.armInitialPayment.value).toBeGreaterThan(0);
      expect(result.fixedPayment.value).toBeGreaterThan(result.armInitialPayment.value); // ARM should start lower
      expect(result.initialSavings.value).toBeGreaterThan(0); // Should save money initially
    });

    test('should calculate break-even rate', () => {
      const result = calculator.calculate(validInputs);
      
      expect(result.breakEvenRate.value).toBeGreaterThan(0);
      expect(result.breakEvenRate.value).toBeLessThan(20); // Reasonable rate
      expect(result.breakEvenRate.formatted).toContain('%');
    });

    test('should provide cost comparison', () => {
      const result = calculator.calculate(validInputs);
      
      expect(result.totalCostComparison.value).toBeTruthy();
      expect(result.totalCostComparison.formatted).toContain('Fixed mortgage total cost');
      expect(result.totalCostComparison.formatted).toContain('ARM total cost');
    });

    test('should provide recommendation', () => {
      const result = calculator.calculate(validInputs);
      
      expect(result.recommendation.value).toBeTruthy();
      expect(result.recommendation.formatted).toBeTruthy();
      expect(['ARM RECOMMENDED', 'FIXED RECOMMENDED']).toContain(result.recommendation.value);
    });

    test('should provide risk analysis', () => {
      const result = calculator.calculate(validInputs);
      
      expect(result.riskAnalysis.value).toBeTruthy();
      expect(result.riskAnalysis.formatted).toContain('ARM');
      expect(result.riskAnalysis.formatted).toContain('FIXED');
    });

    test('should handle rate scenarios', () => {
      const result = calculator.calculate(validInputs);
      
      expect(result.rateScenarios.value).toBeTruthy();
      expect(result.rateScenarios.formatted).toContain('Flat rates');
      expect(result.rateScenarios.formatted).toContain('Moderate rise');
      expect(result.rateScenarios.formatted).toContain('Maximum rate');
    });
  });

  describe('Edge Cases', () => {
    test('should handle zero rates gracefully', () => {
      const inputs = {
        loanAmount: '400000',
        fixedRate: '0.1', // Very low rate
        armInitialRate: '0.1',
        armInitialPeriod: '5',
        loanTerm: '30',
        armMargin: '2',
        currentIndexRate: '0.1',
        armPeriodicCap: '2',
        armLifetimeCap: '5',
        expectedIndexTrend: '0',
        planToStayYears: '7',
        riskTolerance: 'conservative'
      };

      const result = calculator.calculate(inputs);
      expect(result.fixedPayment.value).toBeGreaterThan(0);
      expect(result.armInitialPayment.value).toBeGreaterThan(0);
    });

    test('should handle high rates', () => {
      const inputs = {
        loanAmount: '400000',
        fixedRate: '12',
        armInitialRate: '10',
        armInitialPeriod: '3',
        loanTerm: '30',
        armMargin: '3',
        currentIndexRate: '8',
        armPeriodicCap: '2',
        armLifetimeCap: '6',
        expectedIndexTrend: '1',
        planToStayYears: '5',
        riskTolerance: 'aggressive'
      };

      const result = calculator.calculate(inputs);
      expect(result.fixedPayment.value).toBeGreaterThan(0);
      expect(result.armInitialPayment.value).toBeGreaterThan(0);
    });

    test('should handle short stay within ARM period', () => {
      const inputs = {
        loanAmount: '500000',
        fixedRate: '5',
        armInitialRate: '4',
        armInitialPeriod: '7',
        loanTerm: '30',
        armMargin: '2.5',
        currentIndexRate: '3',
        armPeriodicCap: '2',
        armLifetimeCap: '5',
        expectedIndexTrend: '0.5',
        planToStayYears: '5', // Within ARM period
        riskTolerance: 'moderate'
      };

      const result = calculator.calculate(inputs);
      expect(result.recommendation.value).toBe('ARM RECOMMENDED');
    });

    test('should handle conservative risk tolerance', () => {
      const inputs = {
        loanAmount: '400000',
        fixedRate: '4.5',
        armInitialRate: '3.5',
        armInitialPeriod: '5',
        loanTerm: '30',
        armMargin: '2.5',
        currentIndexRate: '2.5',
        armPeriodicCap: '2',
        armLifetimeCap: '6', // High lifetime cap
        expectedIndexTrend: '1', // Rising rates
        planToStayYears: '10',
        riskTolerance: 'conservative'
      };

      const result = calculator.calculate(inputs);
      expect(result.riskAnalysis.formatted).toContain('Conservative');
    });
  });

  describe('Example Scenarios', () => {
    test('should handle conservative comparison example', () => {
      const example = calculator.examples?.[0];
      if (example) {
        const result = calculator.calculate(example.inputs);
        expect(result.fixedPayment.value).toBeGreaterThan(0);
        expect(result.armInitialPayment.value).toBeGreaterThan(0);
        expect(result.recommendation.value).toBeTruthy();
      }
    });

    test('should handle aggressive comparison example', () => {
      const example = calculator.examples?.[1];
      if (example) {
        const result = calculator.calculate(example.inputs);
        expect(result.fixedPayment.value).toBeGreaterThan(0);
        expect(result.armInitialPayment.value).toBeGreaterThan(0);
        expect(result.recommendation.value).toBeTruthy();
      }
    });
  });

  describe('Validation', () => {
    test('should validate required inputs', () => {
      const invalidInputs = {};
      const validation = validateARMvsFixedInputs(invalidInputs);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });

    test('should validate input ranges', () => {
      const invalidInputs = {
        loanAmount: '10000', // Too low
        fixedRate: '20', // Too high
        armInitialRate: '0.5', // Too low
        armInitialPeriod: '15', // Too high for 30-year loan
        loanTerm: '50', // Too high
        armMargin: '10', // Too high
        currentIndexRate: '15' // Too high
      };
      
      const validation = validateARMvsFixedInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });

    test('should validate cross-field relationships', () => {
      const invalidInputs = {
        loanAmount: '400000',
        fixedRate: '5',
        armInitialRate: '4',
        armInitialPeriod: '35', // Greater than loan term
        loanTerm: '30',
        armMargin: '2',
        currentIndexRate: '3',
        armPeriodicCap: '6', // Greater than lifetime cap
        armLifetimeCap: '5'
      };
      
      const validation = validateARMvsFixedInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('ARM initial period must be less than loan term');
      expect(validation.errors).toContain('ARM periodic cap cannot exceed lifetime cap');
    });

    test('should provide warnings for unusual conditions', () => {
      const unusualInputs = {
        loanAmount: '400000',
        fixedRate: '4',
        armInitialRate: '6', // Higher than fixed
        armInitialPeriod: '5',
        loanTerm: '30',
        armMargin: '2',
        currentIndexRate: '2',
        armPeriodicCap: '2',
        armLifetimeCap: '8' // High lifetime cap
      };
      
      const validation = validateARMvsFixedInputs(unusualInputs);
      expect(validation.warnings.length).toBeGreaterThan(0);
    });
  });

  describe('Formula Documentation', () => {
    test('should have documented formulas', () => {
      expect(calculator.formulas).toBeDefined();
      expect(calculator.formulas.length).toBeGreaterThan(0);
      
      const formulaNames = calculator.formulas.map(f => f.name);
      expect(formulaNames).toContain('Monthly Payment');
      expect(formulaNames).toContain('Break-Even Rate');
      expect(formulaNames).toContain('Total Cost');
    });
  });

  describe('Output Formatting', () => {
    const validInputs = {
      loanAmount: '400000',
      fixedRate: '4.75',
      armInitialRate: '3.5',
      armInitialPeriod: '5',
      loanTerm: '30',
      armMargin: '2.25',
      currentIndexRate: '2.5',
      armPeriodicCap: '2',
      armLifetimeCap: '5',
      expectedIndexTrend: '0.5',
      planToStayYears: '7',
      riskTolerance: 'moderate'
    };

    test('should format currency outputs correctly', () => {
      const result = calculator.calculate(validInputs);
      
      expect(result.fixedPayment.formatted).toMatch(/^\$[\d,]+$/);
      expect(result.armInitialPayment.formatted).toMatch(/^\$[\d,]+$/);
    });

    test('should format percentage outputs correctly', () => {
      const result = calculator.calculate(validInputs);
      
      expect(result.breakEvenRate.formatted).toMatch(/^\d+\.\d{2}%$/);
    });

    test('should provide explanations for all outputs', () => {
      const result = calculator.calculate(validInputs);
      
      Object.values(result).forEach(output => {
        expect(output.explanation).toBeTruthy();
        expect(typeof output.explanation).toBe('string');
      });
    });
  });
});