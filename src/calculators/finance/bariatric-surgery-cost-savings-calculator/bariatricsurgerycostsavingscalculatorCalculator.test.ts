import { describe, it, expect } from 'vitest';
import { bariatricsurgerycostsavingscalculatorCalculator } from './bariatricsurgerycostsavingscalculatorCalculator';
import { bariatricsurgerycostsavingscalculatorCalculatorInputs } from './types';

describe('bariatricsurgerycostsavingscalculatorCalculator', () => {
  const calculator = new bariatricsurgerycostsavingscalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: bariatricsurgerycostsavingscalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: bariatricsurgerycostsavingscalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: bariatricsurgerycostsavingscalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
