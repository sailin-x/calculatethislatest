import { Calculator } from '../../engines/CalculatorEngine';
import { plugin_cost_calculatorCalculatorInputs, plugin_cost_calculatorCalculatorResults, plugin_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class plugin_cost_calculatorCalculatorCalculator implements Calculator<plugin_cost_calculatorCalculatorInputs, plugin_cost_calculatorCalculatorResults> {
  readonly id = 'plugin_cost_calculatorCalculator';
  readonly name = 'plugin_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate plugin_cost_calculatorCalculator values';

  calculate(inputs: plugin_cost_calculatorCalculatorInputs): plugin_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: plugin_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: plugin_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
