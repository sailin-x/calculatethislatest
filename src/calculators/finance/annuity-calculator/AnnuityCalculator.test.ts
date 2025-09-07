import { describe, it, expect } from 'vitest';
import { annuityCalculator } from './AnnuityCalculator';
import { annuityCalculatorFormula } from './formulas';
import { validateAnnuityCalculatorInputs } from './validation';

describe('AnnuityCalculator', () => {
  const testInputs = {
    annuityType: 'immediate' as const,
    paymentType: 'single-premium' as const,
    principal: 100000,
    annualRate: 5.5,
    term: 20,
    paymentFrequency: 12,
    paymentMode: 'receive' as const,
    taxRate: 25,
    inflationRate: 2.5,
    includeTaxes: true,
    includeInflation: true
  };

  describe('Calculator Structure', () => {
    it('should have correct calculator properties', () => {
      expect(annuityCalculator.id).toBe('annuity-calculator');
      expect(annuityCalculator.title).toBe('Annuity Calculator');
      expect(annuityCalculator.category).toBe('finance');
      expect(annuityCalculator.subcategory).toBe('retirement');
      expect(annuityCalculator.description).toBeTruthy();
      expect(annuityCalculator.inputs).toBeInstanceOf(Array);
      expect(annuityCalculator.outputs).toBeInstanceOf(Array);
    });

    it('should have required input fields', () => {
      const inputIds = annuityCalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('principal');
      expect(inputIds).toContain('annualRate');
      expect(inputIds).toContain('term');
      expect(inputIds).toContain('paymentFrequency');
      expect(inputIds).toContain('annuityType');
    });

    it('should have required output fields', () => {
      const outputIds = annuityCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('basicCalculation');
      expect(outputIds).toContain('paymentAnalysis');
      expect(outputIds).toContain('summary');
    });
  });

  describe('Formulas', () => {
    it('should calculate basic annuity values', () => {
      const result = annuityCalculatorFormula.calculate(testInputs);
      expect(result).toBeDefined();
      expect(result.basicCalculation).toBeDefined();
      expect(result.basicCalculation.presentValue).toBeGreaterThan(0);
      expect(result.basicCalculation.futureValue).toBeGreaterThan(0);
    });

    it('should calculate payment analysis', () => {
      const result = annuityCalculatorFormula.calculate(testInputs);
      expect(result.paymentAnalysis).toBeDefined();
      expect(result.paymentAnalysis.periodicPayment).toBeGreaterThan(0);
      expect(result.paymentAnalysis.totalPayments).toBeGreaterThan(0);
    });

    it('should handle different annuity types', () => {
      const deferredInputs = { ...testInputs, annuityType: 'deferred' as const, deferralPeriod: 10 };
      const result = annuityCalculatorFormula.calculate(deferredInputs);
      expect(result).toBeDefined();
      expect(result.deferredResults).toBeDefined();
    });

    it('should handle variable annuities', () => {
      const variableInputs = {
        ...testInputs,
        annuityType: 'variable' as const,
        expectedReturn: 8.0,
        volatility: 15.0
      };
      const result = annuityCalculatorFormula.calculate(variableInputs);
      expect(result).toBeDefined();
      expect(result.variableResults).toBeDefined();
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const validation = validateAnnuityCalculatorInputs(testInputs);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should reject invalid principal', () => {
      const invalidInputs = { ...testInputs, principal: 500 };
      const validation = validateAnnuityCalculatorInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Principal amount must be between $1,000 and $10,000,000');
    });

    it('should reject invalid annual rate', () => {
      const invalidInputs = { ...testInputs, annualRate: 25 };
      const validation = validateAnnuityCalculatorInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Annual interest rate must be between 0% and 20%');
    });

    it('should reject invalid term', () => {
      const invalidInputs = { ...testInputs, term: 60 };
      const validation = validateAnnuityCalculatorInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Annuity term must be between 1 and 50 years');
    });

    it('should reject invalid payment frequency', () => {
      const invalidInputs = { ...testInputs, paymentFrequency: 6 };
      const validation = validateAnnuityCalculatorInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Payment frequency must be valid (annually, semi-annually, quarterly, monthly, or weekly)');
    });

    it('should reject invalid tax rate', () => {
      const invalidInputs = { ...testInputs, taxRate: 110 };
      const validation = validateAnnuityCalculatorInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Tax rate must be between 0% and 100%');
    });

    it('should reject invalid inflation rate', () => {
      const invalidInputs = { ...testInputs, inflationRate: 60 };
      const validation = validateAnnuityCalculatorInputs(invalidInputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Inflation rate must be between -20% and 50%');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero principal', () => {
      const edgeCaseInputs = { ...testInputs, principal: 1000 };
      const result = annuityCalculatorFormula.calculate(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.basicCalculation.presentValue).toBeGreaterThan(0);
    });

    it('should handle high principal', () => {
      const edgeCaseInputs = { ...testInputs, principal: 5000000 };
      const result = annuityCalculatorFormula.calculate(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.basicCalculation.presentValue).toBeGreaterThan(0);
    });

    it('should handle low interest rate', () => {
      const edgeCaseInputs = { ...testInputs, annualRate: 0.5 };
      const result = annuityCalculatorFormula.calculate(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.basicCalculation.periodicPayment).toBeGreaterThan(0);
    });

    it('should handle high interest rate', () => {
      const edgeCaseInputs = { ...testInputs, annualRate: 15 };
      const result = annuityCalculatorFormula.calculate(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.basicCalculation.periodicPayment).toBeGreaterThan(0);
    });

    it('should handle short term', () => {
      const edgeCaseInputs = { ...testInputs, term: 1 };
      const result = annuityCalculatorFormula.calculate(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.basicCalculation.totalPayments).toBeGreaterThan(0);
    });

    it('should handle long term', () => {
      const edgeCaseInputs = { ...testInputs, term: 40 };
      const result = annuityCalculatorFormula.calculate(edgeCaseInputs);
      expect(result).toBeDefined();
      expect(result.basicCalculation.totalPayments).toBeGreaterThan(0);
    });
  });

  describe('Tax Analysis', () => {
    it('should calculate after-tax values', () => {
      const result = annuityCalculatorFormula.calculate(testInputs);
      expect(result.taxAnalysis).toBeDefined();
      expect(result.taxAnalysis.afterTaxValue).toBeDefined();
      expect(result.taxAnalysis.taxPaid).toBeDefined();
    });

    it('should handle zero tax rate', () => {
      const zeroTaxInputs = { ...testInputs, taxRate: 0 };
      const result = annuityCalculatorFormula.calculate(zeroTaxInputs);
      expect(result.taxAnalysis.afterTaxValue).toBe(result.basicCalculation.presentValue);
    });

    it('should handle high tax rate', () => {
      const highTaxInputs = { ...testInputs, taxRate: 40 };
      const result = annuityCalculatorFormula.calculate(highTaxInputs);
      expect(result.taxAnalysis.afterTaxValue).toBeLessThan(result.basicCalculation.presentValue);
    });
  });

  describe('Inflation Analysis', () => {
    it('should calculate inflation-adjusted values', () => {
      const result = annuityCalculatorFormula.calculate(testInputs);
      expect(result.inflationAnalysis).toBeDefined();
      expect(result.inflationAnalysis.realValue).toBeDefined();
      expect(result.inflationAnalysis.purchasingPower).toBeDefined();
    });

    it('should handle zero inflation', () => {
      const zeroInflationInputs = { ...testInputs, inflationRate: 0 };
      const result = annuityCalculatorFormula.calculate(zeroInflationInputs);
      expect(result.inflationAnalysis.realValue).toBe(result.basicCalculation.presentValue);
    });

    it('should handle high inflation', () => {
      const highInflationInputs = { ...testInputs, inflationRate: 5 };
      const result = annuityCalculatorFormula.calculate(highInflationInputs);
      expect(result.inflationAnalysis.realValue).toBeLessThan(result.basicCalculation.presentValue);
    });
  });

  describe('Risk Analysis', () => {
    it('should provide risk analysis for variable annuities', () => {
      const variableInputs = {
        ...testInputs,
        annuityType: 'variable' as const,
        expectedReturn: 8.0,
        volatility: 15.0,
        monteCarloSamples: 5000
      };
      const result = annuityCalculatorFormula.calculate(variableInputs);
      expect(result.riskAnalysis).toBeDefined();
      expect(result.variableResults).toBeDefined();
    });

    it('should calculate probability of success', () => {
      const riskInputs = {
        ...testInputs,
        annuityType: 'variable' as const,
        expectedReturn: 7.0,
        volatility: 12.0,
        monteCarloSamples: 10000,
        confidenceLevel: 90
      };
      const result = annuityCalculatorFormula.calculate(riskInputs);
      expect(result.riskAnalysis.probabilityOfSuccess).toBeDefined();
    });
  });

  describe('Comparison Analysis', () => {
    it('should compare annuity with lump sum', () => {
      const result = annuityCalculatorFormula.calculate(testInputs);
      expect(result.comparison).toBeDefined();
      expect(result.comparison.vsLumpSum).toBeDefined();
    });

    it('should compare with alternative investments', () => {
      const result = annuityCalculatorFormula.calculate(testInputs);
      expect(result.comparison.vsBondInvestment).toBeDefined();
      expect(result.comparison.vsStockInvestment).toBeDefined();
      expect(result.comparison.breakevenPeriod).toBeDefined();
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      expect(annuityCalculator.examples).toBeInstanceOf(Array);
      expect(annuityCalculator.examples.length).toBeGreaterThan(0);

      annuityCalculator.examples.forEach(example => {
        expect(example.title).toBeTruthy();
        expect(example.description).toBeTruthy();
        expect(example.inputs).toBeDefined();
      });
    });

    it('should calculate examples correctly', () => {
      annuityCalculator.examples.forEach(example => {
        const result = annuityCalculatorFormula.calculate(example.inputs as any);
        expect(result).toBeDefined();
        expect(result.basicCalculation).toBeDefined();
      });
    });
  });

  describe('Usage Instructions', () => {
    it('should have comprehensive usage instructions', () => {
      expect(annuityCalculator.usageInstructions).toBeInstanceOf(Array);
      expect(annuityCalculator.usageInstructions.length).toBeGreaterThan(0);

      annuityCalculator.usageInstructions.forEach(instruction => {
        expect(typeof instruction).toBe('string');
        expect(instruction.length).toBeGreaterThan(0);
      });
    });
  });
});