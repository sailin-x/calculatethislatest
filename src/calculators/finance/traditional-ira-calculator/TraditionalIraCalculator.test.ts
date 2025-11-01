import { describe, it, expect } from 'vitest';
import { traditionaliracalculator } from './traditionaliracalculator';
import { traditionaliracalculatorInputs } from './types';

describe('traditionaliracalculator', () => {
  const calculator = new traditionaliracalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: traditionaliracalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: traditionaliracalculatorInputs = {
        value: 50
      };

      const invalidInputs: traditionaliracalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
