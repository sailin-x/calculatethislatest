import { Calculator } from '../../engines/CalculatorEngine';
import { StretchIRACalculatorInputs, StretchIRACalculatorResults, StretchIRACalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class StretchIRACalculatorCalculator implements Calculator<StretchIRACalculatorInputs, StretchIRACalculatorResults> {
  readonly id = 'StretchIRACalculator';
  readonly name = 'StretchIRACalculator Calculator';
  readonly description = 'Calculate StretchIRACalculator values';

  calculate(inputs: StretchIRACalculatorInputs): StretchIRACalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: StretchIRACalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: StretchIRACalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
