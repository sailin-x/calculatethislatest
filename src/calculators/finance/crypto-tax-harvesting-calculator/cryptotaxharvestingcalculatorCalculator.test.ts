import { describe, it, expect } from 'vitest';
import { cryptotaxharvestingcalculatorCalculator } from './cryptotaxharvestingcalculatorCalculator';
import { cryptotaxharvestingcalculatorCalculatorInputs } from './types';

describe('cryptotaxharvestingcalculatorCalculator', () => {
  const calculator = new cryptotaxharvestingcalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: cryptotaxharvestingcalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: cryptotaxharvestingcalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: cryptotaxharvestingcalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
