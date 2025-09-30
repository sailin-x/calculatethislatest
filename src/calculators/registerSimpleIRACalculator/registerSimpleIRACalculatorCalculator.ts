import { Calculator } from '../../engines/CalculatorEngine';
import { registerSimpleIRACalculatorInputs, registerSimpleIRACalculatorResults, registerSimpleIRACalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerSimpleIRACalculatorCalculator implements Calculator<registerSimpleIRACalculatorInputs, registerSimpleIRACalculatorResults> {
  readonly id = 'registerSimpleIRACalculator';
  readonly name = 'registerSimpleIRACalculator Calculator';
  readonly description = 'Calculate registerSimpleIRACalculator values';

  calculate(inputs: registerSimpleIRACalculatorInputs): registerSimpleIRACalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerSimpleIRACalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerSimpleIRACalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
