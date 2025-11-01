import { describe, it, expect } from 'vitest';
import { employeestockoptionplanesopvaluationcalculator } from './employeestockoptionplanesopvaluationcalculator';
import { employeestockoptionplanesopvaluationcalculatorInputs } from './types';

describe('employeestockoptionplanesopvaluationcalculator', () => {
  const calculator = new employeestockoptionplanesopvaluationcalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: employeestockoptionplanesopvaluationcalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: employeestockoptionplanesopvaluationcalculatorInputs = {
        value: 50
      };

      const invalidInputs: employeestockoptionplanesopvaluationcalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
