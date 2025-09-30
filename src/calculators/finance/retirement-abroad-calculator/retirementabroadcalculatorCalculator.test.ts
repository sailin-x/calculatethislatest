import { describe, it, expect } from 'vitest';
import { retirementabroadcalculatorCalculator } from './retirementabroadcalculatorCalculator';
import { retirementabroadcalculatorCalculatorInputs } from './types';

describe('retirementabroadcalculatorCalculator', () => {
  const calculator = new retirementabroadcalculatorCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: retirementabroadcalculatorCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: retirementabroadcalculatorCalculatorInputs = {
        value: 50
      };

      const invalidInputs: retirementabroadcalculatorCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
