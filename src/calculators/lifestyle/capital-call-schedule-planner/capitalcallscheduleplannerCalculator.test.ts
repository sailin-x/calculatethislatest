import { describe, it, expect } from 'vitest';
import { capitalcallscheduleplannerCalculator } from './capitalcallscheduleplannerCalculator';
import { capitalcallscheduleplannerCalculatorInputs } from './types';

describe('capitalcallscheduleplannerCalculator', () => {
  const calculator = new capitalcallscheduleplannerCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: capitalcallscheduleplannerCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: capitalcallscheduleplannerCalculatorInputs = {
        value: 50
      };

      const invalidInputs: capitalcallscheduleplannerCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
