import { describe, it, expect } from 'vitest';
import { simpleiracalculatorCalculator } from './simpleiracalculatorCalculator';
import { simpleiracalculatorCalculatorInputs } from './types';

describe('simpleiracalculatorCalculator', () => {
  const calculator = new simpleiracalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: simpleiracalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: simpleiracalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: simpleiracalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
