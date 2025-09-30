import { describe, it, expect } from 'vitest';
import { ad_reach_and_frequency_calculatorCalculator } from './ad_reach_and_frequency_calculatorCalculator';

describe('ad_reach_and_frequency_calculatorCalculator', () => {
  const calculator = new ad_reach_and_frequency_calculatorCalculator();

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
