import { Calculator } from '../../engines/CalculatorEngine';
import { registerExpectedShortfallCalculatorInputs, registerExpectedShortfallCalculatorResults, registerExpectedShortfallCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerExpectedShortfallCalculatorCalculator implements Calculator<registerExpectedShortfallCalculatorInputs, registerExpectedShortfallCalculatorResults> {
  readonly id = 'registerExpectedShortfallCalculator';
  readonly name = 'registerExpectedShortfallCalculator Calculator';
  readonly description = 'Calculate registerExpectedShortfallCalculator values';

  calculate(inputs: registerExpectedShortfallCalculatorInputs): registerExpectedShortfallCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerExpectedShortfallCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerExpectedShortfallCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
