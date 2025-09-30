import { describe, it, expect } from 'vitest';
import { cryptominingprofitabilitycalculatorCalculator } from './cryptominingprofitabilitycalculatorCalculator';
import { cryptominingprofitabilitycalculatorCalculatorInputs } from './types';

describe('cryptominingprofitabilitycalculatorCalculator', () => {
  const calculator = new cryptominingprofitabilitycalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: cryptominingprofitabilitycalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: cryptominingprofitabilitycalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: cryptominingprofitabilitycalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
