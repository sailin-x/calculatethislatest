import { Calculator } from '../../engines/CalculatorEngine';
import { brick_calculatorCalculatorInputs, brick_calculatorCalculatorResults, brick_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class brick_calculatorCalculatorCalculator implements Calculator<brick_calculatorCalculatorInputs, brick_calculatorCalculatorResults> {
  readonly id = 'brick_calculatorCalculator';
  readonly name = 'brick_calculatorCalculator Calculator';
  readonly description = 'Calculate brick_calculatorCalculator values';

  calculate(inputs: brick_calculatorCalculatorInputs): brick_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: brick_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: brick_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
