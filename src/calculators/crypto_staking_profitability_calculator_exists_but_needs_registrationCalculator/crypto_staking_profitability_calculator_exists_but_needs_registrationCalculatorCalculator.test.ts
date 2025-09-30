import { describe, it, expect } from 'vitest';
import { crypto_staking_profitability_calculator_exists_but_needs_registrationCalculatorCalculator } from './crypto_staking_profitability_calculator_exists_but_needs_registrationCalculatorCalculator';

describe('crypto_staking_profitability_calculator_exists_but_needs_registrationCalculatorCalculator', () => {
  const calculator = new crypto_staking_profitability_calculator_exists_but_needs_registrationCalculatorCalculator();

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
