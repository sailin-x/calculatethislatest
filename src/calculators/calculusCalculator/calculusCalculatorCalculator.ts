import { Calculator } from '../../engines/CalculatorEngine';
import { calculusCalculatorInputs, calculusCalculatorResults, calculusCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class calculusCalculatorCalculator implements Calculator<calculusCalculatorInputs, calculusCalculatorResults> {
  readonly id = 'calculusCalculator';
  readonly name = 'calculusCalculator Calculator';
  readonly description = 'Calculate calculusCalculator values';

  calculate(inputs: calculusCalculatorInputs): calculusCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: calculusCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: calculusCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
