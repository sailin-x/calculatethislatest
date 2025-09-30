import { describe, it, expect } from 'vitest';
import { bondyieldcalculatorCalculator } from './bondyieldcalculatorCalculator';
import { bondyieldcalculatorCalculatorInputs } from './types';

describe('bondyieldcalculatorCalculator', () => {
  const calculator = new bondyieldcalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: bondyieldcalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: bondyieldcalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: bondyieldcalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
