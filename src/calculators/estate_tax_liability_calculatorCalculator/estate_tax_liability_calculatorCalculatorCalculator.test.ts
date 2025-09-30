import { describe, it, expect } from 'vitest';
import { estate_tax_liability_calculatorCalculatorCalculator } from './estate_tax_liability_calculatorCalculatorCalculator';

describe('estate_tax_liability_calculatorCalculatorCalculator', () => {
  const calculator = new estate_tax_liability_calculatorCalculatorCalculator();

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
