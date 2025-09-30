import { describe, it, expect } from 'vitest';
import { stockcalculatorCalculator } from './stockcalculatorCalculator';
import { stockcalculatorCalculatorInputs } from './types';

describe('stockcalculatorCalculator', () => {
  const calculator = new stockcalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: stockcalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: stockcalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: stockcalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
