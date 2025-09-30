import { Calculator } from '../../engines/CalculatorEngine';
import { refinanceCalculatorInputs, refinanceCalculatorResults, refinanceCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class refinanceCalculatorCalculator implements Calculator<refinanceCalculatorInputs, refinanceCalculatorResults> {
  readonly id = 'refinanceCalculator';
  readonly name = 'refinanceCalculator Calculator';
  readonly description = 'Calculate refinanceCalculator values';

  calculate(inputs: refinanceCalculatorInputs): refinanceCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: refinanceCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: refinanceCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
