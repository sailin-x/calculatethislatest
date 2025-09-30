import { Calculator } from '../../engines/CalculatorEngine';
import { saas_metricsCalculatorInputs, saas_metricsCalculatorResults, saas_metricsCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class saas_metricsCalculatorCalculator implements Calculator<saas_metricsCalculatorInputs, saas_metricsCalculatorResults> {
  readonly id = 'saas_metricsCalculator';
  readonly name = 'saas_metricsCalculator Calculator';
  readonly description = 'Calculate saas_metricsCalculator values';

  calculate(inputs: saas_metricsCalculatorInputs): saas_metricsCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: saas_metricsCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: saas_metricsCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
