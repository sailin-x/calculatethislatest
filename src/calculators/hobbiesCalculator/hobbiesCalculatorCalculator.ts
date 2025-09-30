import { Calculator } from '../../engines/CalculatorEngine';
import { hobbiesCalculatorInputs, hobbiesCalculatorResults, hobbiesCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class hobbiesCalculatorCalculator implements Calculator<hobbiesCalculatorInputs, hobbiesCalculatorResults> {
  readonly id = 'hobbiesCalculator';
  readonly name = 'hobbiesCalculator Calculator';
  readonly description = 'Calculate hobbiesCalculator values';

  calculate(inputs: hobbiesCalculatorInputs): hobbiesCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: hobbiesCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: hobbiesCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
