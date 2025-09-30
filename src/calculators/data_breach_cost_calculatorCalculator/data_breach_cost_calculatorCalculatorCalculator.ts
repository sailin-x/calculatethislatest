import { Calculator } from '../../engines/CalculatorEngine';
import { data_breach_cost_calculatorCalculatorInputs, data_breach_cost_calculatorCalculatorResults, data_breach_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class data_breach_cost_calculatorCalculatorCalculator implements Calculator<data_breach_cost_calculatorCalculatorInputs, data_breach_cost_calculatorCalculatorResults> {
  readonly id = 'data_breach_cost_calculatorCalculator';
  readonly name = 'data_breach_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate data_breach_cost_calculatorCalculator values';

  calculate(inputs: data_breach_cost_calculatorCalculatorInputs): data_breach_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: data_breach_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: data_breach_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
