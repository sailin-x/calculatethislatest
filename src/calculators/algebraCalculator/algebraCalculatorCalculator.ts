import { Calculator } from '../../engines/CalculatorEngine';
import { algebraCalculatorInputs, algebraCalculatorResults, algebraCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class algebraCalculatorCalculator implements Calculator<algebraCalculatorInputs, algebraCalculatorResults> {
  readonly id = 'algebraCalculator';
  readonly name = 'algebraCalculator Calculator';
  readonly description = 'Calculate algebraCalculator values';

  calculate(inputs: algebraCalculatorInputs): algebraCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: algebraCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: algebraCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
