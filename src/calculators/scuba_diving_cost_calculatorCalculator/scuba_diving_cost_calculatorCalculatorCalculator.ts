import { Calculator } from '../../engines/CalculatorEngine';
import { scuba_diving_cost_calculatorCalculatorInputs, scuba_diving_cost_calculatorCalculatorResults, scuba_diving_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class scuba_diving_cost_calculatorCalculatorCalculator implements Calculator<scuba_diving_cost_calculatorCalculatorInputs, scuba_diving_cost_calculatorCalculatorResults> {
  readonly id = 'scuba_diving_cost_calculatorCalculator';
  readonly name = 'scuba_diving_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate scuba_diving_cost_calculatorCalculator values';

  calculate(inputs: scuba_diving_cost_calculatorCalculatorInputs): scuba_diving_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: scuba_diving_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: scuba_diving_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
