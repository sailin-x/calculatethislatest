import { describe, it, expect } from 'vitest';
import { commercialfleetinsurancepremiumestimatorCalculator } from './commercialfleetinsurancepremiumestimatorCalculator';
import { commercialfleetinsurancepremiumestimatorCalculatorInputs } from './types';

describe('commercialfleetinsurancepremiumestimatorCalculator', () => {
  const calculator = new commercialfleetinsurancepremiumestimatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: commercialfleetinsurancepremiumestimatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: commercialfleetinsurancepremiumestimatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: commercialfleetinsurancepremiumestimatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
