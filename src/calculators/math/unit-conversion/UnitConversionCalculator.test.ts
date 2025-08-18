import { describe, it, expect } from 'vitest';
import { unitConversionCalculatorFormula, UnitConversionFormulas } from './formulas';

describe('UnitConversionCalculator', () => {
  describe('Length conversions', () => {
    it('should convert meters to feet', () => {
      const result = UnitConversionFormulas.convert(100, 'meter', 'foot', 'length');
      expect(result.result).toBeCloseTo(328.084, 2);
    });

    it('should convert inches to centimeters', () => {
      const result = UnitConversionFormulas.convert(12, 'inch', 'centimeter', 'length');
      expect(result.result).toBeCloseTo(30.48, 2);
    });
  });

  describe('Temperature conversions', () => {
    it('should convert Celsius to Fahrenheit', () => {
      const result = UnitConversionFormulas.convert(100, 'celsius', 'fahrenheit', 'temperature');
      expect(result.result).toBeCloseTo(212, 1);
    });

    it('should convert Fahrenheit to Celsius', () => {
      const result = UnitConversionFormulas.convert(32, 'fahrenheit', 'celsius', 'temperature');
      expect(result.result).toBeCloseTo(0, 1);
    });
  });

  describe('Calculator formula integration', () => {
    it('should convert through formula', () => {
      const inputs = {
        category: 'length',
        fromUnit: 'meter',
        toUnit: 'foot',
        value: 100,
        precision: 4
      };

      const result = unitConversionCalculatorFormula.calculate(inputs);
      expect(parseFloat(result.outputs.result)).toBeCloseTo(328.084, 2);
    });
  });
});