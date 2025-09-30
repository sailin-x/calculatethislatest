import { describe, it, expect } from 'vitest';
import { chapter11bankruptcyplanvaluationCalculator } from './chapter11bankruptcyplanvaluationCalculator';
import { chapter11bankruptcyplanvaluationCalculatorInputs } from './types';

describe('chapter11bankruptcyplanvaluationCalculator', () => {
  const calculator = new chapter11bankruptcyplanvaluationCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: chapter11bankruptcyplanvaluationCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: chapter11bankruptcyplanvaluationCalculatorInputs = {
        value: 50
      };

      const invalidInputs: chapter11bankruptcyplanvaluationCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
