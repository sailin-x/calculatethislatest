import { describe, it, expect } from 'vitest';
import { catastrophebondpricingmodelCalculator } from './catastrophebondpricingmodelCalculator';
import { catastrophebondpricingmodelCalculatorInputs } from './types';

describe('catastrophebondpricingmodelCalculator', () => {
  const calculator = new catastrophebondpricingmodelCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: catastrophebondpricingmodelCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: catastrophebondpricingmodelCalculatorInputs = {
        value: 50
      };

      const invalidInputs: catastrophebondpricingmodelCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
