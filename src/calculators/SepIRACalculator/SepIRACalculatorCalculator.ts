import { Calculator } from '../../engines/CalculatorEngine';
import { SepIRACalculatorInputs, SepIRACalculatorResults, SepIRACalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class SepIRACalculatorCalculator implements Calculator<SepIRACalculatorInputs, SepIRACalculatorResults> {
  readonly id = 'SepIRACalculator';
  readonly name = 'SepIRACalculator Calculator';
  readonly description = 'Calculate SepIRACalculator values';

  calculate(inputs: SepIRACalculatorInputs): SepIRACalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: SepIRACalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: SepIRACalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
