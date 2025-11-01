import { describe, it, expect } from 'vitest';
import { sixsigmacostsavingscalculator } from './sixsigmacostsavingscalculator';
import { sixsigmacostsavingscalculatorInputs } from './types';

describe('sixsigmacostsavingscalculator', () => {
  const calculator = new sixsigmacostsavingscalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: sixsigmacostsavingscalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: sixsigmacostsavingscalculatorInputs = {
        value: 50
      };

      const invalidInputs: sixsigmacostsavingscalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
