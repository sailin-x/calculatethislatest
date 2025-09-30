import { describe, it, expect } from 'vitest';
import { cryptoarbitragecalculatorCalculator } from './cryptoarbitragecalculatorCalculator';
import { cryptoarbitragecalculatorCalculatorInputs } from './types';

describe('cryptoarbitragecalculatorCalculator', () => {
  const calculator = new cryptoarbitragecalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: cryptoarbitragecalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: cryptoarbitragecalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: cryptoarbitragecalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
