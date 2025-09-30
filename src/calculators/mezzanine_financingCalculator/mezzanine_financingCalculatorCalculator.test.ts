import { describe, it, expect } from 'vitest';
import { mezzanine_financingCalculatorCalculator } from './mezzanine_financingCalculatorCalculator';

describe('mezzanine_financingCalculatorCalculator', () => {
  const calculator = new mezzanine_financingCalculatorCalculator();

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
