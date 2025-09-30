import { Calculator } from '../../engines/CalculatorEngine';
import { registerRetirementAbroadCalculatorInputs, registerRetirementAbroadCalculatorResults, registerRetirementAbroadCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerRetirementAbroadCalculatorCalculator implements Calculator<registerRetirementAbroadCalculatorInputs, registerRetirementAbroadCalculatorResults> {
  readonly id = 'registerRetirementAbroadCalculator';
  readonly name = 'registerRetirementAbroadCalculator Calculator';
  readonly description = 'Calculate registerRetirementAbroadCalculator values';

  calculate(inputs: registerRetirementAbroadCalculatorInputs): registerRetirementAbroadCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerRetirementAbroadCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerRetirementAbroadCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
