import { Calculator } from '../../engines/CalculatorEngine';
import { hosting_cost_calculatorCalculatorInputs, hosting_cost_calculatorCalculatorResults, hosting_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class hosting_cost_calculatorCalculatorCalculator implements Calculator<hosting_cost_calculatorCalculatorInputs, hosting_cost_calculatorCalculatorResults> {
  readonly id = 'hosting_cost_calculatorCalculator';
  readonly name = 'hosting_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate hosting_cost_calculatorCalculator values';

  calculate(inputs: hosting_cost_calculatorCalculatorInputs): hosting_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: hosting_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: hosting_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
