import { Calculator } from '../../engines/CalculatorEngine';
import { current_ratio_calculatorCalculatorInputs, current_ratio_calculatorCalculatorResults, current_ratio_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class current_ratio_calculatorCalculatorCalculator implements Calculator<current_ratio_calculatorCalculatorInputs, current_ratio_calculatorCalculatorResults> {
  readonly id = 'current_ratio_calculatorCalculator';
  readonly name = 'current_ratio_calculatorCalculator Calculator';
  readonly description = 'Calculate current_ratio_calculatorCalculator values';

  calculate(inputs: current_ratio_calculatorCalculatorInputs): current_ratio_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: current_ratio_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: current_ratio_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
