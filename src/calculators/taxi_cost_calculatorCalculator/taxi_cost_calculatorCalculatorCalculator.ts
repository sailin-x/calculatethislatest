import { Calculator } from '../../engines/CalculatorEngine';
import { taxi_cost_calculatorCalculatorInputs, taxi_cost_calculatorCalculatorResults, taxi_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class taxi_cost_calculatorCalculatorCalculator implements Calculator<taxi_cost_calculatorCalculatorInputs, taxi_cost_calculatorCalculatorResults> {
  readonly id = 'taxi_cost_calculatorCalculator';
  readonly name = 'taxi_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate taxi_cost_calculatorCalculator values';

  calculate(inputs: taxi_cost_calculatorCalculatorInputs): taxi_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: taxi_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: taxi_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
