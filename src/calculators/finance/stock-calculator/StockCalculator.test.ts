import { describe, it, expect } from 'vitest';
import { stockcalculator } from './stockcalculator';
import { stockcalculatorInputs } from './types';

describe('stockcalculator', () => {
  const calculator = new stockcalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: stockcalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: stockcalculatorInputs = {
        value: 50
      };

      const invalidInputs: stockcalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
