import { Calculator } from '../../engines/CalculatorEngine';
import { cheat_meal_calculatorCalculatorInputs, cheat_meal_calculatorCalculatorResults, cheat_meal_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class cheat_meal_calculatorCalculatorCalculator implements Calculator<cheat_meal_calculatorCalculatorInputs, cheat_meal_calculatorCalculatorResults> {
  readonly id = 'cheat_meal_calculatorCalculator';
  readonly name = 'cheat_meal_calculatorCalculator Calculator';
  readonly description = 'Calculate cheat_meal_calculatorCalculator values';

  calculate(inputs: cheat_meal_calculatorCalculatorInputs): cheat_meal_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: cheat_meal_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: cheat_meal_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
