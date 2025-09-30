import { Calculator } from '../../engines/CalculatorEngine';
import { probability_calculatorCalculatorInputs, probability_calculatorCalculatorResults, probability_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class probability_calculatorCalculatorCalculator implements Calculator<probability_calculatorCalculatorInputs, probability_calculatorCalculatorResults> {
  readonly id = 'probability_calculatorCalculator';
  readonly name = 'probability_calculatorCalculator Calculator';
  readonly description = 'Calculate probability_calculatorCalculator values';

  calculate(inputs: probability_calculatorCalculatorInputs): probability_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: probability_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: probability_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
