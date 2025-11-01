import { describe, it, expect } from 'vitest';
import { corporatebondcalculator } from './corporatebondcalculator';
import { corporatebondcalculatorInputs } from './types';

describe('corporatebondcalculator', () => {
  const calculator = new corporatebondcalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: corporatebondcalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: corporatebondcalculatorInputs = {
        value: 50
      };

      const invalidInputs: corporatebondcalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
