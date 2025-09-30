import { Calculator } from '../../engines/CalculatorEngine';
import { saasMetricsCalculatorInputs, saasMetricsCalculatorResults, saasMetricsCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class saasMetricsCalculatorCalculator implements Calculator<saasMetricsCalculatorInputs, saasMetricsCalculatorResults> {
  readonly id = 'saasMetricsCalculator';
  readonly name = 'saasMetricsCalculator Calculator';
  readonly description = 'Calculate saasMetricsCalculator values';

  calculate(inputs: saasMetricsCalculatorInputs): saasMetricsCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: saasMetricsCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: saasMetricsCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
