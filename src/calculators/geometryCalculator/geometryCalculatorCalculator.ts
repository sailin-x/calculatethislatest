import { Calculator } from '../../engines/CalculatorEngine';
import { geometryCalculatorInputs, geometryCalculatorResults, geometryCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class geometryCalculatorCalculator implements Calculator<geometryCalculatorInputs, geometryCalculatorResults> {
  readonly id = 'geometryCalculator';
  readonly name = 'geometryCalculator Calculator';
  readonly description = 'Calculate geometryCalculator values';

  calculate(inputs: geometryCalculatorInputs): geometryCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: geometryCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: geometryCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
