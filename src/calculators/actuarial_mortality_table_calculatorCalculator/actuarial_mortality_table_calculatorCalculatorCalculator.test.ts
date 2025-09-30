import { describe, it, expect } from 'vitest';
import { actuarial_mortality_table_calculatorCalculatorCalculator } from './actuarial_mortality_table_calculatorCalculatorCalculator';

describe('actuarial_mortality_table_calculatorCalculatorCalculator', () => {
  const calculator = new actuarial_mortality_table_calculatorCalculatorCalculator();

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
