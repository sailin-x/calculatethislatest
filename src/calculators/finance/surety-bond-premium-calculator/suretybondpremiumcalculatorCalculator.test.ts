import { describe, it, expect } from 'vitest';
import { suretybondpremiumcalculatorCalculator } from './suretybondpremiumcalculatorCalculator';
import { suretybondpremiumcalculatorCalculatorInputs } from './types';

describe('suretybondpremiumcalculatorCalculator', () => {
  const calculator = new suretybondpremiumcalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: suretybondpremiumcalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: suretybondpremiumcalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: suretybondpremiumcalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
