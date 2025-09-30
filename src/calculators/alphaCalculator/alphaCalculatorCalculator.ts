import { Calculator } from '../../engines/CalculatorEngine';
import { alphaCalculatorInputs, alphaCalculatorResults, alphaCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class alphaCalculatorCalculator implements Calculator<alphaCalculatorInputs, alphaCalculatorResults> {
  readonly id = 'alphaCalculator';
  readonly name = 'alphaCalculator Calculator';
  readonly description = 'Calculate alphaCalculator values';

  calculate(inputs: alphaCalculatorInputs): alphaCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: alphaCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: alphaCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
