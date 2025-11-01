import { describe, it, expect } from 'vitest';
import { suretybondpremiumcalculator } from './suretybondpremiumcalculator';
import { suretybondpremiumcalculatorInputs } from './types';

describe('suretybondpremiumcalculator', () => {
  const calculator = new suretybondpremiumcalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: suretybondpremiumcalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: suretybondpremiumcalculatorInputs = {
        value: 50
      };

      const invalidInputs: suretybondpremiumcalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
