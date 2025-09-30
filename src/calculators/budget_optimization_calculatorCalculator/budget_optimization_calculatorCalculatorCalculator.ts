import { Calculator } from '../../engines/CalculatorEngine';
import { budget_optimization_calculatorCalculatorInputs, budget_optimization_calculatorCalculatorResults, budget_optimization_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class budget_optimization_calculatorCalculatorCalculator implements Calculator<budget_optimization_calculatorCalculatorInputs, budget_optimization_calculatorCalculatorResults> {
  readonly id = 'budget_optimization_calculatorCalculator';
  readonly name = 'budget_optimization_calculatorCalculator Calculator';
  readonly description = 'Calculate budget_optimization_calculatorCalculator values';

  calculate(inputs: budget_optimization_calculatorCalculatorInputs): budget_optimization_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: budget_optimization_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: budget_optimization_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
