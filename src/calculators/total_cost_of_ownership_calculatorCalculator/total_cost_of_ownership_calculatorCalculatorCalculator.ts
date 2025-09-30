import { Calculator } from '../../engines/CalculatorEngine';
import { total_cost_of_ownership_calculatorCalculatorInputs, total_cost_of_ownership_calculatorCalculatorResults, total_cost_of_ownership_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class total_cost_of_ownership_calculatorCalculatorCalculator implements Calculator<total_cost_of_ownership_calculatorCalculatorInputs, total_cost_of_ownership_calculatorCalculatorResults> {
  readonly id = 'total_cost_of_ownership_calculatorCalculator';
  readonly name = 'total_cost_of_ownership_calculatorCalculator Calculator';
  readonly description = 'Calculate total_cost_of_ownership_calculatorCalculator values';

  calculate(inputs: total_cost_of_ownership_calculatorCalculatorInputs): total_cost_of_ownership_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: total_cost_of_ownership_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: total_cost_of_ownership_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
