import { describe, it, expect } from 'vitest';
import { portfoliooptimizationcalculator } from './portfoliooptimizationcalculator';
import { portfoliooptimizationcalculatorInputs } from './types';

describe('portfoliooptimizationcalculator', () => {
  const calculator = new portfoliooptimizationcalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: portfoliooptimizationcalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: portfoliooptimizationcalculatorInputs = {
        value: 50
      };

      const invalidInputs: portfoliooptimizationcalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
