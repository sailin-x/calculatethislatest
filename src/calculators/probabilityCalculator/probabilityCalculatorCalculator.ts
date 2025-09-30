import { Calculator } from '../../engines/CalculatorEngine';
import { probabilityCalculatorInputs, probabilityCalculatorResults, probabilityCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class probabilityCalculatorCalculator implements Calculator<probabilityCalculatorInputs, probabilityCalculatorResults> {
  readonly id = 'probabilityCalculator';
  readonly name = 'probabilityCalculator Calculator';
  readonly description = 'Calculate probabilityCalculator values';

  calculate(inputs: probabilityCalculatorInputs): probabilityCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: probabilityCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: probabilityCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
