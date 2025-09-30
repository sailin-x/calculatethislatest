import { Calculator } from '../../engines/CalculatorEngine';
import { bmrCalculatorInputs, bmrCalculatorResults, bmrCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class bmrCalculatorCalculator implements Calculator<bmrCalculatorInputs, bmrCalculatorResults> {
  readonly id = 'bmrCalculator';
  readonly name = 'bmrCalculator Calculator';
  readonly description = 'Calculate bmrCalculator values';

  calculate(inputs: bmrCalculatorInputs): bmrCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: bmrCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: bmrCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
