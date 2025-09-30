import { Calculator } from '../../engines/CalculatorEngine';
import { ExpectedShortfallCalculatorInputs, ExpectedShortfallCalculatorResults, ExpectedShortfallCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class ExpectedShortfallCalculatorCalculator implements Calculator<ExpectedShortfallCalculatorInputs, ExpectedShortfallCalculatorResults> {
  readonly id = 'ExpectedShortfallCalculator';
  readonly name = 'ExpectedShortfallCalculator Calculator';
  readonly description = 'Calculate ExpectedShortfallCalculator values';

  calculate(inputs: ExpectedShortfallCalculatorInputs): ExpectedShortfallCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: ExpectedShortfallCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: ExpectedShortfallCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
