import { Calculator } from '../../engines/CalculatorEngine';
import { sum_of_parts_calculatorCalculatorInputs, sum_of_parts_calculatorCalculatorResults, sum_of_parts_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class sum_of_parts_calculatorCalculatorCalculator implements Calculator<sum_of_parts_calculatorCalculatorInputs, sum_of_parts_calculatorCalculatorResults> {
  readonly id = 'sum_of_parts_calculatorCalculator';
  readonly name = 'sum_of_parts_calculatorCalculator Calculator';
  readonly description = 'Calculate sum_of_parts_calculatorCalculator values';

  calculate(inputs: sum_of_parts_calculatorCalculatorInputs): sum_of_parts_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: sum_of_parts_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: sum_of_parts_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
