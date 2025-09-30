import { Calculator } from '../../engines/CalculatorEngine';
import { six_sigma_cost_savings_calculatorCalculatorInputs, six_sigma_cost_savings_calculatorCalculatorResults, six_sigma_cost_savings_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class six_sigma_cost_savings_calculatorCalculatorCalculator implements Calculator<six_sigma_cost_savings_calculatorCalculatorInputs, six_sigma_cost_savings_calculatorCalculatorResults> {
  readonly id = 'six_sigma_cost_savings_calculatorCalculator';
  readonly name = 'six_sigma_cost_savings_calculatorCalculator Calculator';
  readonly description = 'Calculate six_sigma_cost_savings_calculatorCalculator values';

  calculate(inputs: six_sigma_cost_savings_calculatorCalculatorInputs): six_sigma_cost_savings_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: six_sigma_cost_savings_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: six_sigma_cost_savings_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
