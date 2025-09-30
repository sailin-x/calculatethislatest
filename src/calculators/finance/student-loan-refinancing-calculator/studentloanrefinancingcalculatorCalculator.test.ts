import { describe, it, expect } from 'vitest';
import { studentloanrefinancingcalculatorCalculator } from './studentloanrefinancingcalculatorCalculator';
import { studentloanrefinancingcalculatorCalculatorInputs } from './types';

describe('studentloanrefinancingcalculatorCalculator', () => {
  const calculator = new studentloanrefinancingcalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: studentloanrefinancingcalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: studentloanrefinancingcalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: studentloanrefinancingcalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
