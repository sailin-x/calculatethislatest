import { describe, it, expect } from 'vitest';
import { carloancalculatorCalculator } from './carloancalculatorCalculator';
import { carloancalculatorCalculatorInputs } from './types';

describe('carloancalculatorCalculator', () => {
  const calculator = new carloancalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: carloancalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: carloancalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: carloancalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
