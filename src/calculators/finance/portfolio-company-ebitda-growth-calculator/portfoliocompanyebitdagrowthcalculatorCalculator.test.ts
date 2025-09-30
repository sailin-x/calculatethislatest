import { describe, it, expect } from 'vitest';
import { portfoliocompanyebitdagrowthcalculatorCalculator } from './portfoliocompanyebitdagrowthcalculatorCalculator';
import { portfoliocompanyebitdagrowthcalculatorCalculatorInputs } from './types';

describe('portfoliocompanyebitdagrowthcalculatorCalculator', () => {
  const calculator = new portfoliocompanyebitdagrowthcalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: portfoliocompanyebitdagrowthcalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: portfoliocompanyebitdagrowthcalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: portfoliocompanyebitdagrowthcalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
