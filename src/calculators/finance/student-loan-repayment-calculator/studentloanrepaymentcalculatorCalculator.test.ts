import { describe, it, expect } from 'vitest';
import { studentloanrepaymentcalculatorCalculator } from './studentloanrepaymentcalculatorCalculator';
import { studentloanrepaymentcalculatorCalculatorInputs } from './types';

describe('studentloanrepaymentcalculatorCalculator', () => {
  const calculator = new studentloanrepaymentcalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: studentloanrepaymentcalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: studentloanrepaymentcalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: studentloanrepaymentcalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
