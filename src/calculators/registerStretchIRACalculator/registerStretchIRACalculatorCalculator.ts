import { Calculator } from '../../engines/CalculatorEngine';
import { registerStretchIRACalculatorInputs, registerStretchIRACalculatorResults, registerStretchIRACalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerStretchIRACalculatorCalculator implements Calculator<registerStretchIRACalculatorInputs, registerStretchIRACalculatorResults> {
  readonly id = 'registerStretchIRACalculator';
  readonly name = 'registerStretchIRACalculator Calculator';
  readonly description = 'Calculate registerStretchIRACalculator values';

  calculate(inputs: registerStretchIRACalculatorInputs): registerStretchIRACalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerStretchIRACalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerStretchIRACalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
