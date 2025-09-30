import { Calculator } from '../../engines/CalculatorEngine';
import { toll_cost_calculatorCalculatorInputs, toll_cost_calculatorCalculatorResults, toll_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class toll_cost_calculatorCalculatorCalculator implements Calculator<toll_cost_calculatorCalculatorInputs, toll_cost_calculatorCalculatorResults> {
  readonly id = 'toll_cost_calculatorCalculator';
  readonly name = 'toll_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate toll_cost_calculatorCalculator values';

  calculate(inputs: toll_cost_calculatorCalculatorInputs): toll_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: toll_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: toll_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
