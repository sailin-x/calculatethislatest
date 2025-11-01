import { describe, it, expect } from 'vitest';
import { titleloancalculator } from './titleloancalculator';
import { titleloancalculatorInputs } from './types';

describe('titleloancalculator', () => {
  const calculator = new titleloancalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: titleloancalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: titleloancalculatorInputs = {
        value: 50
      };

      const invalidInputs: titleloancalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
