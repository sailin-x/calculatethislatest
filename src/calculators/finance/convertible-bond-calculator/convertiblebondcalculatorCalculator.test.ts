import { describe, it, expect } from 'vitest';
import { convertiblebondcalculatorCalculator } from './convertiblebondcalculatorCalculator';
import { convertiblebondcalculatorCalculatorInputs } from './types';

describe('convertiblebondcalculatorCalculator', () => {
  const calculator = new convertiblebondcalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: convertiblebondcalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: convertiblebondcalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: convertiblebondcalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
