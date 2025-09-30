import { describe, it, expect } from 'vitest';
import { soc2compliancecostestimatorCalculator } from './soc2compliancecostestimatorCalculator';
import { soc2compliancecostestimatorCalculatorInputs } from './types';

describe('soc2compliancecostestimatorCalculator', () => {
  const calculator = new soc2compliancecostestimatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: soc2compliancecostestimatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: soc2compliancecostestimatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: soc2compliancecostestimatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
