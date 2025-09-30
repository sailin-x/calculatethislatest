import { describe, it, expect } from 'vitest';
import { post_money_valuation_calculatorCalculatorCalculator } from './post_money_valuation_calculatorCalculatorCalculator';

describe('post_money_valuation_calculatorCalculatorCalculator', () => {
  const calculator = new post_money_valuation_calculatorCalculatorCalculator();

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
