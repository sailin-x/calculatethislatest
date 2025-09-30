import { describe, it, expect } from 'vitest';
import { clinicaltrialcostestimatorCalculator } from './clinicaltrialcostestimatorCalculator';
import { clinicaltrialcostestimatorCalculatorInputs } from './types';

describe('clinicaltrialcostestimatorCalculator', () => {
  const calculator = new clinicaltrialcostestimatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: clinicaltrialcostestimatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: clinicaltrialcostestimatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: clinicaltrialcostestimatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
