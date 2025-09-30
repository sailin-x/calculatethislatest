import { Calculator } from '../../engines/CalculatorEngine';
import { time_tracking_cost_calculatorCalculatorInputs, time_tracking_cost_calculatorCalculatorResults, time_tracking_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class time_tracking_cost_calculatorCalculatorCalculator implements Calculator<time_tracking_cost_calculatorCalculatorInputs, time_tracking_cost_calculatorCalculatorResults> {
  readonly id = 'time_tracking_cost_calculatorCalculator';
  readonly name = 'time_tracking_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate time_tracking_cost_calculatorCalculator values';

  calculate(inputs: time_tracking_cost_calculatorCalculatorInputs): time_tracking_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: time_tracking_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: time_tracking_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
