import { Calculator } from '../../engines/CalculatorEngine';
import { recipe_scaling_calculatorCalculatorInputs, recipe_scaling_calculatorCalculatorResults, recipe_scaling_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class recipe_scaling_calculatorCalculatorCalculator implements Calculator<recipe_scaling_calculatorCalculatorInputs, recipe_scaling_calculatorCalculatorResults> {
  readonly id = 'recipe_scaling_calculatorCalculator';
  readonly name = 'recipe_scaling_calculatorCalculator Calculator';
  readonly description = 'Calculate recipe_scaling_calculatorCalculator values';

  calculate(inputs: recipe_scaling_calculatorCalculatorInputs): recipe_scaling_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: recipe_scaling_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: recipe_scaling_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
