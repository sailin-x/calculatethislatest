import { describe, it, expect } from 'vitest';
import { cryptominingprofitabilitycalculator } from './cryptominingprofitabilitycalculator';
import { cryptominingprofitabilitycalculatorInputs } from './types';

describe('cryptominingprofitabilitycalculator', () => {
  const calculator = new cryptominingprofitabilitycalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: cryptominingprofitabilitycalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: cryptominingprofitabilitycalculatorInputs = {
        value: 50
      };

      const invalidInputs: cryptominingprofitabilitycalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
