import { describe, it, expect } from 'vitest';
import { corporatebondcalculatorCalculator } from './corporatebondcalculatorCalculator';
import { corporatebondcalculatorCalculatorInputs } from './types';

describe('corporatebondcalculatorCalculator', () => {
  const calculator = new corporatebondcalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: corporatebondcalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: corporatebondcalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: corporatebondcalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
