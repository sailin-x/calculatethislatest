import { describe, it, expect } from 'vitest';
import { shitcoininvestmentcalculatorCalculator } from './shitcoininvestmentcalculatorCalculator';
import { shitcoininvestmentcalculatorCalculatorInputs } from './types';

describe('shitcoininvestmentcalculatorCalculator', () => {
  const calculator = new shitcoininvestmentcalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: shitcoininvestmentcalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: shitcoininvestmentcalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: shitcoininvestmentcalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
