import { describe, it, expect } from 'vitest';
import { municipalbondcalculator } from './municipalbondcalculator';
import { municipalbondcalculatorInputs } from './types';

describe('municipalbondcalculator', () => {
  const calculator = new municipalbondcalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: municipalbondcalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: municipalbondcalculatorInputs = {
        value: 50
      };

      const invalidInputs: municipalbondcalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
