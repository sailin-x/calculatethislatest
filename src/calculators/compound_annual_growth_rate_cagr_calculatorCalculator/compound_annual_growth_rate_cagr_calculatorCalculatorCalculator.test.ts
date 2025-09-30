import { describe, it, expect } from 'vitest';
import { compound_annual_growth_rate_cagr_calculatorCalculatorCalculator } from './compound_annual_growth_rate_cagr_calculatorCalculatorCalculator';

describe('compound_annual_growth_rate_cagr_calculatorCalculatorCalculator', () => {
  const calculator = new compound_annual_growth_rate_cagr_calculatorCalculatorCalculator();

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
