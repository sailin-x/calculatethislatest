import { Calculator } from '../../engines/CalculatorEngine';
import { CorrelationCalculatorInputs, CorrelationCalculatorResults, CorrelationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class CorrelationCalculatorCalculator implements Calculator<CorrelationCalculatorInputs, CorrelationCalculatorResults> {
  readonly id = 'CorrelationCalculator';
  readonly name = 'CorrelationCalculator Calculator';
  readonly description = 'Calculate CorrelationCalculator values';

  calculate(inputs: CorrelationCalculatorInputs): CorrelationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: CorrelationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: CorrelationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
