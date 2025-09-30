import { describe, it, expect } from 'vitest';
import { municipalbondcalculatorCalculator } from './municipalbondcalculatorCalculator';
import { municipalbondcalculatorCalculatorInputs } from './types';

describe('municipalbondcalculatorCalculator', () => {
  const calculator = new municipalbondcalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: municipalbondcalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: municipalbondcalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: municipalbondcalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
