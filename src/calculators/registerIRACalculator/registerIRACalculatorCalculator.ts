import { Calculator } from '../../engines/CalculatorEngine';
import { registerIRACalculatorInputs, registerIRACalculatorResults, registerIRACalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerIRACalculatorCalculator implements Calculator<registerIRACalculatorInputs, registerIRACalculatorResults> {
  readonly id = 'registerIRACalculator';
  readonly name = 'registerIRACalculator Calculator';
  readonly description = 'Calculate registerIRACalculator values';

  calculate(inputs: registerIRACalculatorInputs): registerIRACalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerIRACalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerIRACalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
