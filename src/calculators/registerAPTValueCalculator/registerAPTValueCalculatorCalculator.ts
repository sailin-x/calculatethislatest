import { Calculator } from '../../engines/CalculatorEngine';
import { registerAPTValueCalculatorInputs, registerAPTValueCalculatorResults, registerAPTValueCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerAPTValueCalculatorCalculator implements Calculator<registerAPTValueCalculatorInputs, registerAPTValueCalculatorResults> {
  readonly id = 'registerAPTValueCalculator';
  readonly name = 'registerAPTValueCalculator Calculator';
  readonly description = 'Calculate registerAPTValueCalculator values';

  calculate(inputs: registerAPTValueCalculatorInputs): registerAPTValueCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerAPTValueCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerAPTValueCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
