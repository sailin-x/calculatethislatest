import { Calculator } from '../../engines/CalculatorEngine';
import { savingsGoalCalculatorInputs, savingsGoalCalculatorResults, savingsGoalCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class savingsGoalCalculatorCalculator implements Calculator<savingsGoalCalculatorInputs, savingsGoalCalculatorResults> {
  readonly id = 'savingsGoalCalculator';
  readonly name = 'savingsGoalCalculator Calculator';
  readonly description = 'Calculate savingsGoalCalculator values';

  calculate(inputs: savingsGoalCalculatorInputs): savingsGoalCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: savingsGoalCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: savingsGoalCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
