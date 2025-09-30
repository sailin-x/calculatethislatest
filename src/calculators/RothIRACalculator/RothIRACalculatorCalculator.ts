import { Calculator } from '../../engines/CalculatorEngine';
import { RothIRACalculatorInputs, RothIRACalculatorResults, RothIRACalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class RothIRACalculatorCalculator implements Calculator<RothIRACalculatorInputs, RothIRACalculatorResults> {
  readonly id = 'RothIRACalculator';
  readonly name = 'RothIRACalculator Calculator';
  readonly description = 'Calculate RothIRACalculator values';

  calculate(inputs: RothIRACalculatorInputs): RothIRACalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: RothIRACalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: RothIRACalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
