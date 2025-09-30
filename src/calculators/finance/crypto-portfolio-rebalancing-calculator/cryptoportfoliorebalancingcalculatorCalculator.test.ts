import { describe, it, expect } from 'vitest';
import { cryptoportfoliorebalancingcalculatorCalculator } from './cryptoportfoliorebalancingcalculatorCalculator';
import { cryptoportfoliorebalancingcalculatorCalculatorInputs } from './types';

describe('cryptoportfoliorebalancingcalculatorCalculator', () => {
  const calculator = new cryptoportfoliorebalancingcalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: cryptoportfoliorebalancingcalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: cryptoportfoliorebalancingcalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: cryptoportfoliorebalancingcalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
