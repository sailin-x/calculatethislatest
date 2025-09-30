import { Calculator } from '../../engines/CalculatorEngine';
import { registerBetaCalculatorInputs, registerBetaCalculatorResults, registerBetaCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerBetaCalculatorCalculator implements Calculator<registerBetaCalculatorInputs, registerBetaCalculatorResults> {
  readonly id = 'registerBetaCalculator';
  readonly name = 'registerBetaCalculator Calculator';
  readonly description = 'Calculate registerBetaCalculator values';

  calculate(inputs: registerBetaCalculatorInputs): registerBetaCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerBetaCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerBetaCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
