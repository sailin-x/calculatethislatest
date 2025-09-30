import { describe, it, expect } from 'vitest';
import { studentloanforgivenesscalculatorCalculator } from './studentloanforgivenesscalculatorCalculator';
import { studentloanforgivenesscalculatorCalculatorInputs } from './types';

describe('studentloanforgivenesscalculatorCalculator', () => {
  const calculator = new studentloanforgivenesscalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: studentloanforgivenesscalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: studentloanforgivenesscalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: studentloanforgivenesscalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
