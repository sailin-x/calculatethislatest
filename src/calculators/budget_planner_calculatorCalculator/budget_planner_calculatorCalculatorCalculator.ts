import { Calculator } from '../../engines/CalculatorEngine';
import { budget_planner_calculatorCalculatorInputs, budget_planner_calculatorCalculatorResults, budget_planner_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class budget_planner_calculatorCalculatorCalculator implements Calculator<budget_planner_calculatorCalculatorInputs, budget_planner_calculatorCalculatorResults> {
  readonly id = 'budget_planner_calculatorCalculator';
  readonly name = 'budget_planner_calculatorCalculator Calculator';
  readonly description = 'Calculate budget_planner_calculatorCalculator values';

  calculate(inputs: budget_planner_calculatorCalculatorInputs): budget_planner_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: budget_planner_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: budget_planner_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
