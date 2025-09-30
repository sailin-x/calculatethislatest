import { describe, it, expect } from 'vitest';
import { lapseratesensitivityanalysisCalculator } from './lapseratesensitivityanalysisCalculator';
import { lapseratesensitivityanalysisCalculatorInputs } from './types';

describe('lapseratesensitivityanalysisCalculator', () => {
  const calculator = new lapseratesensitivityanalysisCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: lapseratesensitivityanalysisCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: lapseratesensitivityanalysisCalculatorInputs = {
        value: 50
      };

      const invalidInputs: lapseratesensitivityanalysisCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
