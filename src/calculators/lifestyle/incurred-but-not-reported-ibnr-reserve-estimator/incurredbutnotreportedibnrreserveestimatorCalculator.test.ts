import { describe, it, expect } from 'vitest';
import { incurredbutnotreportedibnrreserveestimatorCalculator } from './incurredbutnotreportedibnrreserveestimatorCalculator';
import { incurredbutnotreportedibnrreserveestimatorCalculatorInputs } from './types';

describe('incurredbutnotreportedibnrreserveestimatorCalculator', () => {
  const calculator = new incurredbutnotreportedibnrreserveestimatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: incurredbutnotreportedibnrreserveestimatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: incurredbutnotreportedibnrreserveestimatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: incurredbutnotreportedibnrreserveestimatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
