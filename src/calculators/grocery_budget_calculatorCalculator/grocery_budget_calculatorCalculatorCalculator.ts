import { Calculator } from '../../engines/CalculatorEngine';
import { grocery_budget_calculatorCalculatorInputs, grocery_budget_calculatorCalculatorResults, grocery_budget_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class grocery_budget_calculatorCalculatorCalculator implements Calculator<grocery_budget_calculatorCalculatorInputs, grocery_budget_calculatorCalculatorResults> {
  readonly id = 'grocery_budget_calculatorCalculator';
  readonly name = 'grocery_budget_calculatorCalculator Calculator';
  readonly description = 'Calculate grocery_budget_calculatorCalculator values';

  calculate(inputs: grocery_budget_calculatorCalculatorInputs): grocery_budget_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: grocery_budget_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: grocery_budget_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
