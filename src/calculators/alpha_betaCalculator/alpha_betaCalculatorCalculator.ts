import { Calculator } from '../../engines/CalculatorEngine';
import { alpha_betaCalculatorInputs, alpha_betaCalculatorResults, alpha_betaCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class alpha_betaCalculatorCalculator implements Calculator<alpha_betaCalculatorInputs, alpha_betaCalculatorResults> {
  readonly id = 'alpha_betaCalculator';
  readonly name = 'alpha_betaCalculator Calculator';
  readonly description = 'Calculate alpha_betaCalculator values';

  calculate(inputs: alpha_betaCalculatorInputs): alpha_betaCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: alpha_betaCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: alpha_betaCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
