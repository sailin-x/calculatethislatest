import { BalloonMortgageCalculator } from './BalloonMortgageCalculator';
import { validateBalloonMortgageInputs } from './quickValidation';

describe('Balloon Mortgage Calculator', () => {
  const calculator = BalloonMortgageCalculator;

  describe('Basic Functionality', () => {
    test('should have correct calculator metadata', () => {
      expect(calculator.id).toBe('balloon-mortgage');
      expect(calculator.name).toBe('Balloon Mortgage Calculator');
      expect(calculator.category).toBe('finance');
      expect(calculator.tags).toContain('mortgage');
      expect(calculator.tags).toContain('balloon');
      expect(calculator.tags).toContain('financing');
    });

    test('should have required inputs', () => {
      const requiredInputs = calculator.inputs.filter(input => input.required);
      expect(requiredInputs.length).toBeGreaterThan(0);
      
      const inputIds = calculator.inputs.map(input => input.id);
      expect(inputIds).toContain('loanAmount');
      expect(inputIds).toContain('interestRate');
      expect(inputIds).toContain('balloonTerm');
      expect(inputIds).toContain('amortizationPeriod');
    });

    test('should have expected outputs', () => {
      const outputIds = calculator.outputs.map(output => output.id);
      expect(outputIds).toContain('monthlyPayment');
      expect(outputIds).toContain('balloonPayment');
      expect(outputIds).toContain('totalInterestPaid');
      expect(outputIds).toContain('principalPaid');
      expect(outputIds).toContain('traditionalComparison');
      expect(outputIds).toContain('riskAssessment');
      expect(outputIds).toContain('exitStrategyAnalysis');
    });
  });

  describe('Calculation Tests', () => {
    const validInputs = {
      loanAmount: '400000',
      interestRate: '5.25',
      balloonTerm: '5',
      amortizationPeriod: '30',
      downPayment: '80000',
      balloonType: 'interest-principal',
      expectedAppreciation: '3',
      refinanceRate: '5.75',
      closingCosts: '5000',
      exitStrategy: 'refinance'
    };

    test('should calculate basic payments correctly', () => {
      const result = calculator.calculate(validInputs);
      
      expect(result.monthlyPayment.value).toBeGreaterThan(0);
      expect(result.balloonPayment.value).toBeGreaterThan(0);
      expect(result.balloonPayment.value).toBeLessThan(Number(validInputs.loanAmount) - Number(validInputs.downPayment));
    });

    test('should calculate interest and principal correctly', () => {
      const result = calculator.calculate(validInputs);
      
      expect(result.totalInterestPaid.value).toBeGreaterThan(0);
      expect(result.principalPaid.value).toBeGreaterThan(0);
      expect(result.principalPaid.value + result.balloonPayment.value).toBeCloseTo(
        Number(validInputs.loanAmount) - Number(validInputs.downPayment), 
        -2 // Within $100
      );
    });

    test('should provide traditional mortgage comparison', () => {
      const result = calculator.calculate(validInputs);
      
      expect(result.traditionalComparison.value).toBeTruthy();
      expect(result.traditionalComparison.formatted).toContain('Balloon total cost');
      expect(result.traditionalComparison.formatted).toContain('Traditional cost');
    });

    test('should provide cash flow analysis', () => {
      const result = calculator.calculate(validInputs);
      
      expect(result.cashFlowAnalysis.value).toBeTruthy();
      expect(result.cashFlowAnalysis.formatted).toContain('Monthly payment');
      expect(result.cashFlowAnalysis.formatted).toContain('Monthly savings');
    });

    test('should provide risk assessment', () => {
      const result = calculator.calculate(validInputs);
      
      expect(result.riskAssessment.value).toBeTruthy();
      expect(result.riskAssessment.formatted).toBeTruthy();
    });

    test('should provide exit strategy analysis', () => {
      const result = calculator.calculate(validInputs);
      
      expect(result.exitStrategyAnalysis.value).toBeTruthy();
      expect(result.exitStrategyAnalysis.formatted).toBeTruthy();
    });

    test('should provide break-even analysis', () => {
      const result = calculator.calculate(validInputs);
      
      expect(result.breakEvenAnalysis.value).toBeTruthy();
      expect(result.breakEvenAnalysis.formatted).toContain('Property needs');
      expect(result.breakEvenAnalysis.formatted).toContain('Expected equity');
    });
  });

  describe('Balloon Types', () => {
    const baseInputs = {
      loanAmount: '400000',
      interestRate: '5.25',
      balloonTerm: '5',
      amortizationPeriod: '30',
      downPayment: '80000',
      expectedAppreciation: '3',
      refinanceRate: '5.75',
      closingCosts: '5000',
      exitStrategy: 'refinance'
    };

    test('should handle interest-only balloon correctly', () => {
      const inputs = { ...baseInputs, balloonType: 'interest-only' };
      const result = calculator.calculate(inputs);
      
      expect(result.principalPaid.value).toBe(0);
      expect(result.balloonPayment.value).toBe(Number(baseInputs.loanAmount) - Number(baseInputs.downPayment));
    });

    test('should handle partial amortization balloon', () => {
      const inputs = { 
        ...baseInputs, 
        balloonType: 'partial-amortization',
        partialAmortizationYears: '15'
      };
      const result = calculator.calculate(inputs);
      
      expect(result.principalPaid.value).toBeGreaterThan(0);
      expect(result.balloonPayment.value).toBeLessThan(Number(baseInputs.loanAmount) - Number(baseInputs.downPayment));
    });

    test('should handle standard interest-principal balloon', () => {
      const inputs = { ...baseInputs, balloonType: 'interest-principal' };
      const result = calculator.calculate(inputs);
      
      expect(result.principalPaid.value).toBeGreaterThan(0);
      expect(result.balloonPayment.value).toBeLessThan(Number(baseInputs.loanAmount) - Number(baseInputs.downPayment));
    });
  });

  describe('Exit Strategies', () => {
    const baseInputs = {
      loanAmount: '400000',
      interestRate: '5.25',
      balloonTerm: '5',
      amortizationPeriod: '30',
      downPayment: '80000',
      balloonType: 'interest-principal',
      expectedAppreciation: '3',
      refinanceRate: '5.75',
      closingCosts: '5000'
    };

    test('should analyze refinance strategy', () => {
      const inputs = { ...baseInputs, exitStrategy: 'refinance' };
      const result = calculator.calculate(inputs);
      
      expect(result.exitStrategyAnalysis.formatted).toContain('REFINANCE');
    });

    test('should analyze sell strategy', () => {
      const inputs = { ...baseInputs, exitStrategy: 'sell' };
      const result = calculator.calculate(inputs);
      
      expect(result.exitStrategyAnalysis.formatted).toContain('SELL');
    });

    test('should analyze cash strategy', () => {
      const inputs = { ...baseInputs, exitStrategy: 'cash' };
      const result = calculator.calculate(inputs);
      
      expect(result.exitStrategyAnalysis.formatted).toContain('CASH');
    });

    test('should analyze extend strategy', () => {
      const inputs = { ...baseInputs, exitStrategy: 'extend' };
      const result = calculator.calculate(inputs);
      
      expect(result.exitStrategyAnalysis.formatted).toContain('EXTEND');
    });
  });

  describe('Edge Cases', () => {
    test('should handle zero down payment', () => {
      const inputs = {
        loanAmount: '400000',
        interestRate: '5.25',
        balloonTerm: '5',
        amortizationPeriod: '30',
        downPayment: '0',
        balloonType: 'interest-principal',
        expectedAppreciation: '3',
        refinanceRate: '5.75',
        closingCosts: '5000',
        exitStrategy: 'refinance'
      };

      const result = calculator.calculate(inputs);
      expect(result.monthlyPayment.value).toBeGreaterThan(0);
      expect(result.balloonPayment.value).toBe(Number(inputs.loanAmount));
    });

    test('should handle very low interest rates', () => {
      const inputs = {
        loanAmount: '400000',
        interestRate: '1.0',
        balloonTerm: '5',
        amortizationPeriod: '30',
        downPayment: '80000',
        balloonType: 'interest-principal',
        expectedAppreciation: '3',
        refinanceRate: '1.5',
        closingCosts: '5000',
        exitStrategy: 'refinance'
      };

      const result = calculator.calculate(inputs);
      expect(result.monthlyPayment.value).toBeGreaterThan(0);
      expect(result.balloonPayment.value).toBeGreaterThan(0);
    });

    test('should handle high interest rates', () => {
      const inputs = {
        loanAmount: '400000',
        interestRate: '12.0',
        balloonTerm: '5',
        amortizationPeriod: '30',
        downPayment: '80000',
        balloonType: 'interest-principal',
        expectedAppreciation: '3',
        refinanceRate: '13.0',
        closingCosts: '5000',
        exitStrategy: 'refinance'
      };

      const result = calculator.calculate(inputs);
      expect(result.monthlyPayment.value).toBeGreaterThan(0);
      expect(result.balloonPayment.value).toBeGreaterThan(0);
    });

    test('should handle short balloon terms', () => {
      const inputs = {
        loanAmount: '400000',
        interestRate: '5.25',
        balloonTerm: '2',
        amortizationPeriod: '30',
        downPayment: '80000',
        balloonType: 'interest-principal',
        expectedAppreciation: '3',
        refinanceRate: '5.75',
        closingCosts: '5000',
        exitStrategy: 'refinance'
      };

      const result = calculator.calculate(inputs);
      expect(result.monthlyPayment.value).toBeGreaterThan(0);
      expect(result.principalPaid.value).toBeLessThan(50000); // Limited principal paydown in 2 years
    });

    test('should handle negative appreciation', () => {
      const inputs = {
        loanAmount: '400000',
        interestRate: '5.25',
        balloonTerm: '5',
        amortizationPeriod: '30',
        downPayment: '80000',
        balloonType: 'interest-principal',
        expectedAppreciation: '-2',
        refinanceRate: '5.75',
        closingCosts: '5000',
        exitStrategy: 'sell'
      };

      const result = calculator.calculate(inputs);
      expect(result.breakEvenAnalysis.formatted).toContain('Property needs');
    });
  });

  describe('Example Scenarios', () => {
    test('should handle standard 5-year balloon example', () => {
      const example = calculator.examples?.[0];
      if (example) {
        const result = calculator.calculate(example.inputs);
        expect(result.monthlyPayment.value).toBeGreaterThan(0);
        expect(result.balloonPayment.value).toBeGreaterThan(0);
        expect(result.riskAssessment.value).toBeTruthy();
      }
    });

    test('should handle interest-only commercial example', () => {
      const example = calculator.examples?.[1];
      if (example) {
        const result = calculator.calculate(example.inputs);
        expect(result.monthlyPayment.value).toBeGreaterThan(0);
        expect(result.principalPaid.value).toBe(0); // Interest-only
        expect(result.exitStrategyAnalysis.formatted).toContain('SELL');
      }
    });

    test('should handle partial amortization example', () => {
      const example = calculator.examples?.[2];
      if (example) {
        const result = calculator.calculate(example.inputs);
        expect(result.monthlyPayment.value).toBeGreaterThan(0);
        expect(result.principalPaid.value).toBeGreaterThan(0);
        expect(result.balloonPayment.value).toBeLessThan(Number(example.inputs.loanAmount) - Number(example.inputs.downPayment));
      }
    });
  });

  describe('Validation', () => {
    test('should validate required inputs', () => {
      const invalidInputs = {};
      const validation = validateBalloonMortgageInputs(invalidInputs);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });

    test('should validate input ranges', () => {
      const invalidInputs = {
        loanAmount: '10000', // Too low
        interestRate: '20', // Too high
        balloonTerm: '15', // Too high
        amortizationPeriod: '50' // Too high
      };
      
      const validation = validateBalloonMortgageInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });

    test('should validate cross-field relationships', () => {
      const invalidInputs = {
        loanAmount: '400000',
        interestRate: '5',
        balloonTerm: '35', // Greater than amortization period
        amortizationPeriod: '30',
        downPayment: '500000' // Greater than loan amount
      };
      
      const validation = validateBalloonMortgageInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Balloon term must be less than amortization period');
    });

    test('should provide warnings for risky conditions', () => {
      const riskyInputs = {
        loanAmount: '400000',
        interestRate: '5',
        balloonTerm: '8', // Long term
        amortizationPeriod: '30',
        downPayment: '20000', // Low down payment (5%)
        expectedAppreciation: '-1', // Negative appreciation
        refinanceRate: '8' // High refinance rate
      };
      
      const validation = validateBalloonMortgageInputs(riskyInputs);
      expect(validation.warnings.length).toBeGreaterThan(0);
    });
  });

  describe('Formula Documentation', () => {
    test('should have documented formulas', () => {
      expect(calculator.formulas).toBeDefined();
      expect(calculator.formulas.length).toBeGreaterThan(0);
      
      const formulaNames = calculator.formulas.map(f => f.name);
      expect(formulaNames).toContain('Monthly Payment');
      expect(formulaNames).toContain('Balloon Payment');
      expect(formulaNames).toContain('Interest-Only Payment');
      expect(formulaNames).toContain('Break-Even Appreciation');
    });
  });

  describe('Output Formatting', () => {
    const validInputs = {
      loanAmount: '400000',
      interestRate: '5.25',
      balloonTerm: '5',
      amortizationPeriod: '30',
      downPayment: '80000',
      balloonType: 'interest-principal',
      expectedAppreciation: '3',
      refinanceRate: '5.75',
      closingCosts: '5000',
      exitStrategy: 'refinance'
    };

    test('should format currency outputs correctly', () => {
      const result = calculator.calculate(validInputs);
      
      expect(result.monthlyPayment.formatted).toMatch(/^\$[\d,]+$/);
      expect(result.balloonPayment.formatted).toMatch(/^\$[\d,]+$/);
      expect(result.totalInterestPaid.formatted).toMatch(/^\$[\d,]+$/);
      expect(result.principalPaid.formatted).toMatch(/^\$[\d,]+$/);
    });

    test('should provide explanations for all outputs', () => {
      const result = calculator.calculate(validInputs);
      
      Object.values(result).forEach(output => {
        expect(output.explanation).toBeTruthy();
        expect(typeof output.explanation).toBe('string');
      });
    });

    test('should format multi-line outputs correctly', () => {
      const result = calculator.calculate(validInputs);
      
      expect(result.traditionalComparison.formatted).toContain('•');
      expect(result.cashFlowAnalysis.formatted).toContain('•');
      expect(result.riskAssessment.formatted).toContain('•');
      expect(result.exitStrategyAnalysis.formatted).toContain('•');
      expect(result.breakEvenAnalysis.formatted).toContain('•');
    });
  });
});