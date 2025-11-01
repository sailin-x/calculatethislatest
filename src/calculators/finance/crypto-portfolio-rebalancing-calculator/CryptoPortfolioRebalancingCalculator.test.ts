import { describe, it, expect } from 'vitest';
import { cryptoportfoliorebalancingcalculator } from './cryptoportfoliorebalancingcalculator';
import { cryptoportfoliorebalancingcalculatorInputs } from './types';

describe('cryptoportfoliorebalancingcalculator', () => {
  const calculator = new cryptoportfoliorebalancingcalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: cryptoportfoliorebalancingcalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: cryptoportfoliorebalancingcalculatorInputs = {
        value: 50
      };

      const invalidInputs: cryptoportfoliorebalancingcalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
