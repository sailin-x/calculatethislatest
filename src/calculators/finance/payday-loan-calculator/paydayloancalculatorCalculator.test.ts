import { describe, it, expect } from 'vitest';
import { paydayloancalculatorCalculator } from './paydayloancalculatorCalculator';
import { paydayloancalculatorCalculatorInputs } from './types';

describe('paydayloancalculatorCalculator', () => {
  const calculator = new paydayloancalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: paydayloancalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: paydayloancalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: paydayloancalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
