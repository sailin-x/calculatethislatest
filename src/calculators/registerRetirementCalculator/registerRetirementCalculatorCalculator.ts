import { Calculator } from '../../engines/CalculatorEngine';
import { registerRetirementCalculatorInputs, registerRetirementCalculatorResults, registerRetirementCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerRetirementCalculatorCalculator implements Calculator<registerRetirementCalculatorInputs, registerRetirementCalculatorResults> {
  readonly id = 'registerRetirementCalculator';
  readonly name = 'registerRetirementCalculator Calculator';
  readonly description = 'Calculate registerRetirementCalculator values';

  calculate(inputs: registerRetirementCalculatorInputs): registerRetirementCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerRetirementCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerRetirementCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
