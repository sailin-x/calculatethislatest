import { Calculator } from '../../engines/CalculatorEngine';
import { meal_kit_cost_calculatorCalculatorInputs, meal_kit_cost_calculatorCalculatorResults, meal_kit_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class meal_kit_cost_calculatorCalculatorCalculator implements Calculator<meal_kit_cost_calculatorCalculatorInputs, meal_kit_cost_calculatorCalculatorResults> {
  readonly id = 'meal_kit_cost_calculatorCalculator';
  readonly name = 'meal_kit_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate meal_kit_cost_calculatorCalculator values';

  calculate(inputs: meal_kit_cost_calculatorCalculatorInputs): meal_kit_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: meal_kit_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: meal_kit_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
