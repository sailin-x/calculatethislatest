import { describe, it, expect } from 'vitest';
import { freecashflowtoequityfcfevaluationCalculator } from './freecashflowtoequityfcfevaluationCalculator';
import { freecashflowtoequityfcfevaluationCalculatorInputs } from './types';

describe('freecashflowtoequityfcfevaluationCalculator', () => {
  const calculator = new freecashflowtoequityfcfevaluationCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: freecashflowtoequityfcfevaluationCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: freecashflowtoequityfcfevaluationCalculatorInputs = {
        value: 50
      };

      const invalidInputs: freecashflowtoequityfcfevaluationCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
