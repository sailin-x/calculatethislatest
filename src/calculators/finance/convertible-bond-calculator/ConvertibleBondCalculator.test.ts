import { describe, it, expect } from 'vitest';
import { convertiblebondcalculator } from './convertiblebondcalculator';
import { convertiblebondcalculatorInputs } from './types';

describe('convertiblebondcalculator', () => {
  const calculator = new convertiblebondcalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: convertiblebondcalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: convertiblebondcalculatorInputs = {
        value: 50
      };

      const invalidInputs: convertiblebondcalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
