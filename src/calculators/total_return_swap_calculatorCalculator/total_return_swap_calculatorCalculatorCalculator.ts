import { Calculator } from '../../engines/CalculatorEngine';
import { total_return_swap_calculatorCalculatorInputs, total_return_swap_calculatorCalculatorResults, total_return_swap_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class total_return_swap_calculatorCalculatorCalculator implements Calculator<total_return_swap_calculatorCalculatorInputs, total_return_swap_calculatorCalculatorResults> {
  readonly id = 'total_return_swap_calculatorCalculator';
  readonly name = 'total_return_swap_calculatorCalculator Calculator';
  readonly description = 'Calculate total_return_swap_calculatorCalculator values';

  calculate(inputs: total_return_swap_calculatorCalculatorInputs): total_return_swap_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: total_return_swap_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: total_return_swap_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
