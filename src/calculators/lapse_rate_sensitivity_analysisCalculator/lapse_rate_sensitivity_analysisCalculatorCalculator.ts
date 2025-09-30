import { Calculator } from '../../engines/CalculatorEngine';
import { lapse_rate_sensitivity_analysisCalculatorInputs, lapse_rate_sensitivity_analysisCalculatorResults, lapse_rate_sensitivity_analysisCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class lapse_rate_sensitivity_analysisCalculatorCalculator implements Calculator<lapse_rate_sensitivity_analysisCalculatorInputs, lapse_rate_sensitivity_analysisCalculatorResults> {
  readonly id = 'lapse_rate_sensitivity_analysisCalculator';
  readonly name = 'lapse_rate_sensitivity_analysisCalculator Calculator';
  readonly description = 'Calculate lapse_rate_sensitivity_analysisCalculator values';

  calculate(inputs: lapse_rate_sensitivity_analysisCalculatorInputs): lapse_rate_sensitivity_analysisCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: lapse_rate_sensitivity_analysisCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: lapse_rate_sensitivity_analysisCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
