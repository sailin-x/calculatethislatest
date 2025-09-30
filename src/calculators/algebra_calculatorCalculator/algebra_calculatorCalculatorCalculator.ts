import { Calculator } from '../../engines/CalculatorEngine';
import { algebra_calculatorCalculatorInputs, algebra_calculatorCalculatorResults, algebra_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class algebra_calculatorCalculatorCalculator implements Calculator<algebra_calculatorCalculatorInputs, algebra_calculatorCalculatorResults> {
  readonly id = 'algebra_calculatorCalculator';
  readonly name = 'algebra_calculatorCalculator Calculator';
  readonly description = 'Calculate algebra_calculatorCalculator values';

  calculate(inputs: algebra_calculatorCalculatorInputs): algebra_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: algebra_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: algebra_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
