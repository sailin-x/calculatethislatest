import { describe, it, expect } from 'vitest';
import { stretchiracalculator } from './stretchiracalculator';
import { stretchiracalculatorInputs } from './types';

describe('stretchiracalculator', () => {
  const calculator = new stretchiracalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: stretchiracalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: stretchiracalculatorInputs = {
        value: 50
      };

      const invalidInputs: stretchiracalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
