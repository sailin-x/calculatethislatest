import { describe, it, expect } from 'vitest';
import { sepiracalculator } from './sepiracalculator';
import { sepiracalculatorInputs } from './types';

describe('sepiracalculator', () => {
  const calculator = new sepiracalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: sepiracalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: sepiracalculatorInputs = {
        value: 50
      };

      const invalidInputs: sepiracalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
