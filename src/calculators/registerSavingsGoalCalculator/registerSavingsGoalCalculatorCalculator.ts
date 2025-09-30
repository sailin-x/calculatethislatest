import { Calculator } from '../../engines/CalculatorEngine';
import { registerSavingsGoalCalculatorInputs, registerSavingsGoalCalculatorResults, registerSavingsGoalCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerSavingsGoalCalculatorCalculator implements Calculator<registerSavingsGoalCalculatorInputs, registerSavingsGoalCalculatorResults> {
  readonly id = 'registerSavingsGoalCalculator';
  readonly name = 'registerSavingsGoalCalculator Calculator';
  readonly description = 'Calculate registerSavingsGoalCalculator values';

  calculate(inputs: registerSavingsGoalCalculatorInputs): registerSavingsGoalCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerSavingsGoalCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerSavingsGoalCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
