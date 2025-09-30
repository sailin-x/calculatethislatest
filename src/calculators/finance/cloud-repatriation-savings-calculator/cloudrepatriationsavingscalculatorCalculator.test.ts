import { describe, it, expect } from 'vitest';
import { cloudrepatriationsavingscalculatorCalculator } from './cloudrepatriationsavingscalculatorCalculator';
import { cloudrepatriationsavingscalculatorCalculatorInputs } from './types';

describe('cloudrepatriationsavingscalculatorCalculator', () => {
  const calculator = new cloudrepatriationsavingscalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: cloudrepatriationsavingscalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: cloudrepatriationsavingscalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: cloudrepatriationsavingscalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
