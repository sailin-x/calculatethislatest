import { Calculator } from '../../engines/CalculatorEngine';
import { skydiving_cost_calculatorCalculatorInputs, skydiving_cost_calculatorCalculatorResults, skydiving_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class skydiving_cost_calculatorCalculatorCalculator implements Calculator<skydiving_cost_calculatorCalculatorInputs, skydiving_cost_calculatorCalculatorResults> {
  readonly id = 'skydiving_cost_calculatorCalculator';
  readonly name = 'skydiving_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate skydiving_cost_calculatorCalculator values';

  calculate(inputs: skydiving_cost_calculatorCalculatorInputs): skydiving_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: skydiving_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: skydiving_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
