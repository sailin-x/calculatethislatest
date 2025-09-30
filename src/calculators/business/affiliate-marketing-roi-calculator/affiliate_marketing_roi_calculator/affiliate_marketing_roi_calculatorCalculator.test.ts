import { describe, it, expect } from 'vitest';
import { affiliate_marketing_roi_calculatorCalculator } from './affiliate_marketing_roi_calculatorCalculator';

describe('affiliate_marketing_roi_calculatorCalculator', () => {
  const calculator = new affiliate_marketing_roi_calculatorCalculator();

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
