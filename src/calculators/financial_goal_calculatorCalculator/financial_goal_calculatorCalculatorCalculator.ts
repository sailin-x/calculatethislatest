import { Calculator } from '../../engines/CalculatorEngine';
import { financial_goal_calculatorCalculatorInputs, financial_goal_calculatorCalculatorResults, financial_goal_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_goal_calculatorCalculatorCalculator implements Calculator<financial_goal_calculatorCalculatorInputs, financial_goal_calculatorCalculatorResults> {
  readonly id = 'financial_goal_calculatorCalculator';
  readonly name = 'financial_goal_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_goal_calculatorCalculator values';

  calculate(inputs: financial_goal_calculatorCalculatorInputs): financial_goal_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_goal_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_goal_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
