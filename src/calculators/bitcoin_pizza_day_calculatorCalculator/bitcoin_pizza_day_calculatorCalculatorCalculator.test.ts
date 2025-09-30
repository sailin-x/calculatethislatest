import { describe, it, expect } from 'vitest';
import { bitcoin_pizza_day_calculatorCalculatorCalculator } from './bitcoin_pizza_day_calculatorCalculatorCalculator';

describe('bitcoin_pizza_day_calculatorCalculatorCalculator', () => {
  const calculator = new bitcoin_pizza_day_calculatorCalculatorCalculator();

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
