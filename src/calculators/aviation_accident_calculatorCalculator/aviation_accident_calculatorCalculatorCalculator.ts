import { Calculator } from '../../engines/CalculatorEngine';
import { aviation_accident_calculatorCalculatorInputs, aviation_accident_calculatorCalculatorResults, aviation_accident_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class aviation_accident_calculatorCalculatorCalculator implements Calculator<aviation_accident_calculatorCalculatorInputs, aviation_accident_calculatorCalculatorResults> {
  readonly id = 'aviation_accident_calculatorCalculator';
  readonly name = 'aviation_accident_calculatorCalculator Calculator';
  readonly description = 'Calculate aviation_accident_calculatorCalculator values';

  calculate(inputs: aviation_accident_calculatorCalculatorInputs): aviation_accident_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: aviation_accident_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: aviation_accident_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
