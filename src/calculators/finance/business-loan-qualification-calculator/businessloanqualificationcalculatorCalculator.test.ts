import { describe, it, expect } from 'vitest';
import { businessloanqualificationcalculatorCalculator } from './businessloanqualificationcalculatorCalculator';
import { businessloanqualificationcalculatorCalculatorInputs } from './types';

describe('businessloanqualificationcalculatorCalculator', () => {
  const calculator = new businessloanqualificationcalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: businessloanqualificationcalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: businessloanqualificationcalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: businessloanqualificationcalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
