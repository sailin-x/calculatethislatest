import { describe, it, expect } from 'vitest';
import { backdoor_roth_iraCalculatorCalculator } from './backdoor_roth_iraCalculatorCalculator';

describe('backdoor_roth_iraCalculatorCalculator', () => {
  const calculator = new backdoor_roth_iraCalculatorCalculator();

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
