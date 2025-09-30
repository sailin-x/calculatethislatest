import { Calculator } from '../../engines/CalculatorEngine';
import { savings_goal_calculatorCalculatorInputs, savings_goal_calculatorCalculatorResults, savings_goal_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class savings_goal_calculatorCalculatorCalculator implements Calculator<savings_goal_calculatorCalculatorInputs, savings_goal_calculatorCalculatorResults> {
  readonly id = 'savings_goal_calculatorCalculator';
  readonly name = 'savings_goal_calculatorCalculator Calculator';
  readonly description = 'Calculate savings_goal_calculatorCalculator values';

  calculate(inputs: savings_goal_calculatorCalculatorInputs): savings_goal_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: savings_goal_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: savings_goal_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
