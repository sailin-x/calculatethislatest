import { Calculator } from '../../engines/CalculatorEngine';
import { sortino_ratio_calculatorCalculatorInputs, sortino_ratio_calculatorCalculatorResults, sortino_ratio_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class sortino_ratio_calculatorCalculatorCalculator implements Calculator<sortino_ratio_calculatorCalculatorInputs, sortino_ratio_calculatorCalculatorResults> {
  readonly id = 'sortino_ratio_calculatorCalculator';
  readonly name = 'sortino_ratio_calculatorCalculator Calculator';
  readonly description = 'Calculate sortino_ratio_calculatorCalculator values';

  calculate(inputs: sortino_ratio_calculatorCalculatorInputs): sortino_ratio_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: sortino_ratio_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: sortino_ratio_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
