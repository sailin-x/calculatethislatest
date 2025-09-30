import { describe, it, expect } from 'vitest';
import { itoutsourcingvsinhousecostbenefitanalysisCalculator } from './itoutsourcingvsinhousecostbenefitanalysisCalculator';
import { itoutsourcingvsinhousecostbenefitanalysisCalculatorInputs } from './types';

describe('itoutsourcingvsinhousecostbenefitanalysisCalculator', () => {
  const calculator = new itoutsourcingvsinhousecostbenefitanalysisCalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: itoutsourcingvsinhousecostbenefitanalysisCalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: itoutsourcingvsinhousecostbenefitanalysisCalculatorInputs = {
        value: 50
      };

      const invalidInputs: itoutsourcingvsinhousecostbenefitanalysisCalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
