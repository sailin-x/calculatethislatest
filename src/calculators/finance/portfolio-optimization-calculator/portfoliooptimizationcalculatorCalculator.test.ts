import { describe, it, expect } from 'vitest';
import { portfoliooptimizationcalculatorCalculator } from './portfoliooptimizationcalculatorCalculator';
import { portfoliooptimizationcalculatorCalculatorInputs } from './types';

describe('portfoliooptimizationcalculatorCalculator', () => {
  const calculator = new portfoliooptimizationcalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: portfoliooptimizationcalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: portfoliooptimizationcalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: portfoliooptimizationcalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
