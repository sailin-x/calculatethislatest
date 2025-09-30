import { Calculator } from '../../engines/CalculatorEngine';
import { landscaping_cost_calculatorCalculatorInputs, landscaping_cost_calculatorCalculatorResults, landscaping_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class landscaping_cost_calculatorCalculatorCalculator implements Calculator<landscaping_cost_calculatorCalculatorInputs, landscaping_cost_calculatorCalculatorResults> {
  readonly id = 'landscaping_cost_calculatorCalculator';
  readonly name = 'landscaping_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate landscaping_cost_calculatorCalculator values';

  calculate(inputs: landscaping_cost_calculatorCalculatorInputs): landscaping_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: landscaping_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: landscaping_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
