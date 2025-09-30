import { Calculator } from '../../engines/CalculatorEngine';
import { complexNumberCalculatorInputs, complexNumberCalculatorResults, complexNumberCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class complexNumberCalculatorCalculator implements Calculator<complexNumberCalculatorInputs, complexNumberCalculatorResults> {
  readonly id = 'complexNumberCalculator';
  readonly name = 'complexNumberCalculator Calculator';
  readonly description = 'Calculate complexNumberCalculator values';

  calculate(inputs: complexNumberCalculatorInputs): complexNumberCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: complexNumberCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: complexNumberCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
