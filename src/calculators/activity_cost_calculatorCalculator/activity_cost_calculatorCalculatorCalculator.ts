import { Calculator } from '../../engines/CalculatorEngine';
import { activity_cost_calculatorCalculatorInputs, activity_cost_calculatorCalculatorResults, activity_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class activity_cost_calculatorCalculatorCalculator implements Calculator<activity_cost_calculatorCalculatorInputs, activity_cost_calculatorCalculatorResults> {
  readonly id = 'activity_cost_calculatorCalculator';
  readonly name = 'activity_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate activity_cost_calculatorCalculator values';

  calculate(inputs: activity_cost_calculatorCalculatorInputs): activity_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: activity_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: activity_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
