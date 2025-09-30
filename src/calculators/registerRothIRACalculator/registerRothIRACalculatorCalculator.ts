import { Calculator } from '../../engines/CalculatorEngine';
import { registerRothIRACalculatorInputs, registerRothIRACalculatorResults, registerRothIRACalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerRothIRACalculatorCalculator implements Calculator<registerRothIRACalculatorInputs, registerRothIRACalculatorResults> {
  readonly id = 'registerRothIRACalculator';
  readonly name = 'registerRothIRACalculator Calculator';
  readonly description = 'Calculate registerRothIRACalculator values';

  calculate(inputs: registerRothIRACalculatorInputs): registerRothIRACalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerRothIRACalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerRothIRACalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
