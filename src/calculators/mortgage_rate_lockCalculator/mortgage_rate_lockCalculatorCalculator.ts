import { Calculator } from '../../engines/CalculatorEngine';
import { mortgage_rate_lockCalculatorInputs, mortgage_rate_lockCalculatorResults, mortgage_rate_lockCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mortgage_rate_lockCalculatorCalculator implements Calculator<mortgage_rate_lockCalculatorInputs, mortgage_rate_lockCalculatorResults> {
  readonly id = 'mortgage_rate_lockCalculator';
  readonly name = 'mortgage_rate_lockCalculator Calculator';
  readonly description = 'Calculate mortgage_rate_lockCalculator values';

  calculate(inputs: mortgage_rate_lockCalculatorInputs): mortgage_rate_lockCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mortgage_rate_lockCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mortgage_rate_lockCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
