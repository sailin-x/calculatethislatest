import { Calculator } from '../../engines/CalculatorEngine';
import { food_cost_calculatorCalculatorInputs, food_cost_calculatorCalculatorResults, food_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class food_cost_calculatorCalculatorCalculator implements Calculator<food_cost_calculatorCalculatorInputs, food_cost_calculatorCalculatorResults> {
  readonly id = 'food_cost_calculatorCalculator';
  readonly name = 'food_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate food_cost_calculatorCalculator values';

  calculate(inputs: food_cost_calculatorCalculatorInputs): food_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: food_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: food_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
