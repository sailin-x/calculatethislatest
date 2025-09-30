import { Calculator } from '../../engines/CalculatorEngine';
import { scientificCalculatorInputs, scientificCalculatorResults, scientificCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class scientificCalculatorCalculator implements Calculator<scientificCalculatorInputs, scientificCalculatorResults> {
  readonly id = 'scientificCalculator';
  readonly name = 'scientificCalculator Calculator';
  readonly description = 'Calculate scientificCalculator values';

  calculate(inputs: scientificCalculatorInputs): scientificCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: scientificCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: scientificCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
