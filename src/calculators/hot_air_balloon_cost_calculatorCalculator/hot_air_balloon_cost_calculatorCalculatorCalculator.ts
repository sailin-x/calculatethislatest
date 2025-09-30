import { Calculator } from '../../engines/CalculatorEngine';
import { hot_air_balloon_cost_calculatorCalculatorInputs, hot_air_balloon_cost_calculatorCalculatorResults, hot_air_balloon_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class hot_air_balloon_cost_calculatorCalculatorCalculator implements Calculator<hot_air_balloon_cost_calculatorCalculatorInputs, hot_air_balloon_cost_calculatorCalculatorResults> {
  readonly id = 'hot_air_balloon_cost_calculatorCalculator';
  readonly name = 'hot_air_balloon_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate hot_air_balloon_cost_calculatorCalculator values';

  calculate(inputs: hot_air_balloon_cost_calculatorCalculatorInputs): hot_air_balloon_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: hot_air_balloon_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: hot_air_balloon_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
