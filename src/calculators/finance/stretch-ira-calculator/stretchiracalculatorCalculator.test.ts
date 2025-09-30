import { describe, it, expect } from 'vitest';
import { stretchiracalculatorCalculator } from './stretchiracalculatorCalculator';
import { stretchiracalculatorCalculatorInputs } from './types';

describe('stretchiracalculatorCalculator', () => {
  const calculator = new stretchiracalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: stretchiracalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: stretchiracalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: stretchiracalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
