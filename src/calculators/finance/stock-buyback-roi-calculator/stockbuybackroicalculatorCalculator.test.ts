import { describe, it, expect } from 'vitest';
import { stockbuybackroicalculatorCalculator } from './stockbuybackroicalculatorCalculator';
import { stockbuybackroicalculatorCalculatorInputs } from './types';

describe('stockbuybackroicalculatorCalculator', () => {
  const calculator = new stockbuybackroicalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: stockbuybackroicalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: stockbuybackroicalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: stockbuybackroicalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
