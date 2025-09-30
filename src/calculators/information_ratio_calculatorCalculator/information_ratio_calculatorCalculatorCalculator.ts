import { Calculator } from '../../engines/CalculatorEngine';
import { information_ratio_calculatorCalculatorInputs, information_ratio_calculatorCalculatorResults, information_ratio_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class information_ratio_calculatorCalculatorCalculator implements Calculator<information_ratio_calculatorCalculatorInputs, information_ratio_calculatorCalculatorResults> {
  readonly id = 'information_ratio_calculatorCalculator';
  readonly name = 'information_ratio_calculatorCalculator Calculator';
  readonly description = 'Calculate information_ratio_calculatorCalculator values';

  calculate(inputs: information_ratio_calculatorCalculatorInputs): information_ratio_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: information_ratio_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: information_ratio_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
