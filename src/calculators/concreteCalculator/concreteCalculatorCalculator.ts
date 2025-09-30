import { Calculator } from '../../engines/CalculatorEngine';
import { concreteCalculatorInputs, concreteCalculatorResults, concreteCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class concreteCalculatorCalculator implements Calculator<concreteCalculatorInputs, concreteCalculatorResults> {
  readonly id = 'concreteCalculator';
  readonly name = 'concreteCalculator Calculator';
  readonly description = 'Calculate concreteCalculator values';

  calculate(inputs: concreteCalculatorInputs): concreteCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: concreteCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: concreteCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
