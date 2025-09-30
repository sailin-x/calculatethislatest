import { Calculator } from '../../engines/CalculatorEngine';
import { matrixCalculatorInputs, matrixCalculatorResults, matrixCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class matrixCalculatorCalculator implements Calculator<matrixCalculatorInputs, matrixCalculatorResults> {
  readonly id = 'matrixCalculator';
  readonly name = 'matrixCalculator Calculator';
  readonly description = 'Calculate matrixCalculator values';

  calculate(inputs: matrixCalculatorInputs): matrixCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: matrixCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: matrixCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
