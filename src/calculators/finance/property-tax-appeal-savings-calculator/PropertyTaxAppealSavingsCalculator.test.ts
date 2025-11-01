import { describe, it, expect } from 'vitest';
import { propertytaxappealsavingscalculator } from './propertytaxappealsavingscalculator';
import { propertytaxappealsavingscalculatorInputs } from './types';

describe('propertytaxappealsavingscalculator', () => {
  const calculator = new propertytaxappealsavingscalculator();

  describe('calculate', () => {
    it('should calculate results correctly', () => {
      const inputs: propertytaxappealsavingscalculatorInputs = {
        value: 100
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(typeof result.result).toBe('number');
      expect(result.details).toBeDefined();
    });

    it('should validate inputs', () => {
      const validInputs: propertytaxappealsavingscalculatorInputs = {
        value: 50
      };

      const invalidInputs: propertytaxappealsavingscalculatorInputs = {
        value: -10
      };

      expect(calculator.validateInputs(validInputs)).toBe(true);
      expect(calculator.validateInputs(invalidInputs)).toBe(false);
    });
  });
});
