import { Calculator } from '../../engines/CalculatorEngine';
import { e_discovery_cost_calculatorCalculatorInputs, e_discovery_cost_calculatorCalculatorResults, e_discovery_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class e_discovery_cost_calculatorCalculatorCalculator implements Calculator<e_discovery_cost_calculatorCalculatorInputs, e_discovery_cost_calculatorCalculatorResults> {
  readonly id = 'e_discovery_cost_calculatorCalculator';
  readonly name = 'e_discovery_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate e_discovery_cost_calculatorCalculator values';

  calculate(inputs: e_discovery_cost_calculatorCalculatorInputs): e_discovery_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: e_discovery_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: e_discovery_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
