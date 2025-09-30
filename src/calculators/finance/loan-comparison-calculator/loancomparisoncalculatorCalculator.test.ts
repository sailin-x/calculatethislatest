import { describe, it, expect } from 'vitest';
import { loancomparisoncalculatorCalculator } from './loancomparisoncalculatorCalculator';
import { loancomparisoncalculatorCalculatorInputs } from './types';

describe('loancomparisoncalculatorCalculator', () => {
  const calculator = new loancomparisoncalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: loancomparisoncalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: loancomparisoncalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: loancomparisoncalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
