import { describe, it, expect } from 'vitest';
import { bondyieldcalculator } from './bondyieldcalculator';
import { bondyieldcalculatorInputs } from './types';

describe('bondyieldcalculator', () => {
  const calculator = new bondyieldcalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: bondyieldcalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: bondyieldcalculatorInputs = {
        value: 50
      };

      const invalidInputs: bondyieldcalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
