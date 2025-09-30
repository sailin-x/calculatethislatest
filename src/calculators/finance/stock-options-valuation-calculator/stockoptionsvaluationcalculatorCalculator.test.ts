import { describe, it, expect } from 'vitest';
import { stockoptionsvaluationcalculatorCalculator } from './stockoptionsvaluationcalculatorCalculator';
import { stockoptionsvaluationcalculatorCalculatorInputs } from './types';

describe('stockoptionsvaluationcalculatorCalculator', () => {
  const calculator = new stockoptionsvaluationcalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: stockoptionsvaluationcalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: stockoptionsvaluationcalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: stockoptionsvaluationcalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
