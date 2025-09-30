import { describe, it, expect } from 'vitest';
import { restrictedstockunitrsuvsstockoptioncalculatorCalculator } from './restrictedstockunitrsuvsstockoptioncalculatorCalculator';
import { restrictedstockunitrsuvsstockoptioncalculatorCalculatorInputs } from './types';

describe('restrictedstockunitrsuvsstockoptioncalculatorCalculator', () => {
  const calculator = new restrictedstockunitrsuvsstockoptioncalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: restrictedstockunitrsuvsstockoptioncalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: restrictedstockunitrsuvsstockoptioncalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: restrictedstockunitrsuvsstockoptioncalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
