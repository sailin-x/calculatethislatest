import { Calculator } from '../../engines/CalculatorEngine';
import { pmi_cancellationCalculatorInputs, pmi_cancellationCalculatorResults, pmi_cancellationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class pmi_cancellationCalculatorCalculator implements Calculator<pmi_cancellationCalculatorInputs, pmi_cancellationCalculatorResults> {
  readonly id = 'pmi_cancellationCalculator';
  readonly name = 'pmi_cancellationCalculator Calculator';
  readonly description = 'Calculate pmi_cancellationCalculator values';

  calculate(inputs: pmi_cancellationCalculatorInputs): pmi_cancellationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: pmi_cancellationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: pmi_cancellationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
