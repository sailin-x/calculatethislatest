import { Calculator } from '../../engines/CalculatorEngine';
import { consultant_utilization_rate_profitability_calculatorCalculatorInputs, consultant_utilization_rate_profitability_calculatorCalculatorResults, consultant_utilization_rate_profitability_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class consultant_utilization_rate_profitability_calculatorCalculatorCalculator implements Calculator<consultant_utilization_rate_profitability_calculatorCalculatorInputs, consultant_utilization_rate_profitability_calculatorCalculatorResults> {
  readonly id = 'consultant_utilization_rate_profitability_calculatorCalculator';
  readonly name = 'consultant_utilization_rate_profitability_calculatorCalculator Calculator';
  readonly description = 'Calculate consultant_utilization_rate_profitability_calculatorCalculator values';

  calculate(inputs: consultant_utilization_rate_profitability_calculatorCalculatorInputs): consultant_utilization_rate_profitability_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: consultant_utilization_rate_profitability_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: consultant_utilization_rate_profitability_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
