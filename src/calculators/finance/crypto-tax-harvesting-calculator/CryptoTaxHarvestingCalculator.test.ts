import { describe, it, expect } from 'vitest';
import { cryptotaxharvestingcalculator } from './cryptotaxharvestingcalculator';
import { cryptotaxharvestingcalculatorInputs } from './types';

describe('cryptotaxharvestingcalculator', () => {
  const calculator = new cryptotaxharvestingcalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: cryptotaxharvestingcalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: cryptotaxharvestingcalculatorInputs = {
        value: 50
      };

      const invalidInputs: cryptotaxharvestingcalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
