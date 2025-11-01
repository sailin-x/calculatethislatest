import { describe, it, expect } from 'vitest';
import { restrictedstockunitrsuvsstockoptioncalculator } from './restrictedstockunitrsuvsstockoptioncalculator';
import { restrictedstockunitrsuvsstockoptioncalculatorInputs } from './types';

describe('restrictedstockunitrsuvsstockoptioncalculator', () => {
  const calculator = new restrictedstockunitrsuvsstockoptioncalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: restrictedstockunitrsuvsstockoptioncalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: restrictedstockunitrsuvsstockoptioncalculatorInputs = {
        value: 50
      };

      const invalidInputs: restrictedstockunitrsuvsstockoptioncalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
