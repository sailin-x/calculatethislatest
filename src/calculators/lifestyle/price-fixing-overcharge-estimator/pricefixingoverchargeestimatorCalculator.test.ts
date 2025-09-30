import { describe, it, expect } from 'vitest';
import { pricefixingoverchargeestimatorCalculator } from './pricefixingoverchargeestimatorCalculator';
import { pricefixingoverchargeestimatorCalculatorInputs } from './types';

describe('pricefixingoverchargeestimatorCalculator', () => {
  const calculator = new pricefixingoverchargeestimatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: pricefixingoverchargeestimatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: pricefixingoverchargeestimatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: pricefixingoverchargeestimatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
