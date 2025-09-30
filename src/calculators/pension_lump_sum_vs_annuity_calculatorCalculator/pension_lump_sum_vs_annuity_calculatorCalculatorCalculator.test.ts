import { describe, it, expect } from 'vitest';
import { pension_lump_sum_vs_annuity_calculatorCalculatorCalculator } from './pension_lump_sum_vs_annuity_calculatorCalculatorCalculator';

describe('pension_lump_sum_vs_annuity_calculatorCalculatorCalculator', () => {
  const calculator = new pension_lump_sum_vs_annuity_calculatorCalculatorCalculator();

  it('should calculate correctly', () => {
    const inputs = { value: 100, rate: 0.1 };
    const result = calculator.calculate(inputs);
    expect(result.result).toBeDefined();
    expect(typeof result.result).toBe('number');
  });

  it('should validate inputs', () => {
    const validInputs = { value: 100, rate: 0.1 };
    expect(calculator.validate(validInputs)).toBe(true);

    const invalidInputs = { value: -100, rate: 0.1 };
    expect(calculator.validate(invalidInputs)).toBe(false);
  });
});
