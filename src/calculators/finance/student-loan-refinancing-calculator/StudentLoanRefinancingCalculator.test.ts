import { describe, it, expect } from 'vitest';
import { studentloanrefinancingcalculator } from './studentloanrefinancingcalculator';
import { studentloanrefinancingcalculatorInputs } from './types';

describe('studentloanrefinancingcalculator', () => {
  const calculator = new studentloanrefinancingcalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: studentloanrefinancingcalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: studentloanrefinancingcalculatorInputs = {
        value: 50
      };

      const invalidInputs: studentloanrefinancingcalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
