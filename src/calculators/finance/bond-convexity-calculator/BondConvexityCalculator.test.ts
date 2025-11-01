import { describe, it, expect } from 'vitest';
import { bondconvexitycalculator } from './bondconvexitycalculator';
import { bondconvexitycalculatorInputs } from './types';

describe('bondconvexitycalculator', () => {
  const calculator = new bondconvexitycalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: bondconvexitycalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: bondconvexitycalculatorInputs = {
        value: 50
      };

      const invalidInputs: bondconvexitycalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
