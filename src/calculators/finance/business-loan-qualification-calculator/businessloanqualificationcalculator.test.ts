import { describe, it, expect } from 'vitest';
import { businessloanqualificationcalculator } from './businessloanqualificationcalculator';
import { businessloanqualificationcalculatorInputs } from './types';

describe('businessloanqualificationcalculator', () => {
  const calculator = new businessloanqualificationcalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: businessloanqualificationcalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: businessloanqualificationcalculatorInputs = {
        value: 50
      };

      const invalidInputs: businessloanqualificationcalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
