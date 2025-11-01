import { describe, it, expect } from 'vitest';
import { rothiracalculator } from './rothiracalculator';
import { rothiracalculatorInputs } from './types';

describe('rothiracalculator', () => {
  const calculator = new rothiracalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: rothiracalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: rothiracalculatorInputs = {
        value: 50
      };

      const invalidInputs: rothiracalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
