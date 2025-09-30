import { describe, it, expect } from 'vitest';
import { sixsigmacostsavingscalculatorCalculator } from './sixsigmacostsavingscalculatorCalculator';
import { sixsigmacostsavingscalculatorCalculatorInputs } from './types';

describe('sixsigmacostsavingscalculatorCalculator', () => {
  const calculator = new sixsigmacostsavingscalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: sixsigmacostsavingscalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: sixsigmacostsavingscalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: sixsigmacostsavingscalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
