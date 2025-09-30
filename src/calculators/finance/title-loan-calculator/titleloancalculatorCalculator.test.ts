import { describe, it, expect } from 'vitest';
import { titleloancalculatorCalculator } from './titleloancalculatorCalculator';
import { titleloancalculatorCalculatorInputs } from './types';

describe('titleloancalculatorCalculator', () => {
  const calculator = new titleloancalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: titleloancalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: titleloancalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: titleloancalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
