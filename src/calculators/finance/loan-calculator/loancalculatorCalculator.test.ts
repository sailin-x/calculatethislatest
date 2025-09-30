import { describe, it, expect } from 'vitest';
import { loancalculatorCalculator } from './loancalculatorCalculator';
import { loancalculatorCalculatorInputs } from './types';

describe('loancalculatorCalculator', () => {
  const calculator = new loancalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: loancalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: loancalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: loancalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
