import { Calculator } from '../../engines/CalculatorEngine';
import { registerSepIRACalculatorInputs, registerSepIRACalculatorResults, registerSepIRACalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerSepIRACalculatorCalculator implements Calculator<registerSepIRACalculatorInputs, registerSepIRACalculatorResults> {
  readonly id = 'registerSepIRACalculator';
  readonly name = 'registerSepIRACalculator Calculator';
  readonly description = 'Calculate registerSepIRACalculator values';

  calculate(inputs: registerSepIRACalculatorInputs): registerSepIRACalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerSepIRACalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerSepIRACalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
