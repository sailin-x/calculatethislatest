import { describe, it, expect } from 'vitest';
import { incurred_but_not_reported_ibnr_reserve_estimatorCalculatorCalculator } from './incurred_but_not_reported_ibnr_reserve_estimatorCalculatorCalculator';

describe('incurred_but_not_reported_ibnr_reserve_estimatorCalculatorCalculator', () => {
  const calculator = new incurred_but_not_reported_ibnr_reserve_estimatorCalculatorCalculator();

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
