import { Calculator } from '../../engines/CalculatorEngine';
import { rideshare_cost_calculatorCalculatorInputs, rideshare_cost_calculatorCalculatorResults, rideshare_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class rideshare_cost_calculatorCalculatorCalculator implements Calculator<rideshare_cost_calculatorCalculatorInputs, rideshare_cost_calculatorCalculatorResults> {
  readonly id = 'rideshare_cost_calculatorCalculator';
  readonly name = 'rideshare_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate rideshare_cost_calculatorCalculator values';

  calculate(inputs: rideshare_cost_calculatorCalculatorInputs): rideshare_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: rideshare_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: rideshare_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
