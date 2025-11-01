import { describe, it, expect } from 'vitest';
import { paydayloancalculator } from './paydayloancalculator';
import { paydayloancalculatorInputs } from './types';

describe('paydayloancalculator', () => {
  const calculator = new paydayloancalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: paydayloancalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: paydayloancalculatorInputs = {
        value: 50
      };

      const invalidInputs: paydayloancalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
