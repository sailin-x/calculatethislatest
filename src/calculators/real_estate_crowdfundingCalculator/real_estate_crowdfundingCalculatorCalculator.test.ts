import { describe, it, expect } from 'vitest';
import { real_estate_crowdfundingCalculatorCalculator } from './real_estate_crowdfundingCalculatorCalculator';

describe('real_estate_crowdfundingCalculatorCalculator', () => {
  const calculator = new real_estate_crowdfundingCalculatorCalculator();

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
