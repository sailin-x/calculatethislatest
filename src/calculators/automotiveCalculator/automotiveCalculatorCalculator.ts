import { Calculator } from '../../engines/CalculatorEngine';
import { automotiveCalculatorInputs, automotiveCalculatorResults, automotiveCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class automotiveCalculatorCalculator implements Calculator<automotiveCalculatorInputs, automotiveCalculatorResults> {
  readonly id = 'automotiveCalculator';
  readonly name = 'automotiveCalculator Calculator';
  readonly description = 'Calculate automotiveCalculator values';

  calculate(inputs: automotiveCalculatorInputs): automotiveCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: automotiveCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: automotiveCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
