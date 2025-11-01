import { describe, it, expect } from 'vitest';
import { bariatricsurgerycostsavingscalculator } from './bariatricsurgerycostsavingscalculator';
import { bariatricsurgerycostsavingscalculatorInputs } from './types';

describe('bariatricsurgerycostsavingscalculator', () => {
  const calculator = new bariatricsurgerycostsavingscalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: bariatricsurgerycostsavingscalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: bariatricsurgerycostsavingscalculatorInputs = {
        value: 50
      };

      const invalidInputs: bariatricsurgerycostsavingscalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
