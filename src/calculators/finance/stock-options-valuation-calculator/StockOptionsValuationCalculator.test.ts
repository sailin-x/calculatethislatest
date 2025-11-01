import { describe, it, expect } from 'vitest';
import { stockoptionsvaluationcalculator } from './stockoptionsvaluationcalculator';
import { stockoptionsvaluationcalculatorInputs } from './types';

describe('stockoptionsvaluationcalculator', () => {
  const calculator = new stockoptionsvaluationcalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: stockoptionsvaluationcalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: stockoptionsvaluationcalculatorInputs = {
        value: 50
      };

      const invalidInputs: stockoptionsvaluationcalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
