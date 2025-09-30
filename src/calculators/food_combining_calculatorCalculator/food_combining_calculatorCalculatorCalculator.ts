import { Calculator } from '../../engines/CalculatorEngine';
import { food_combining_calculatorCalculatorInputs, food_combining_calculatorCalculatorResults, food_combining_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class food_combining_calculatorCalculatorCalculator implements Calculator<food_combining_calculatorCalculatorInputs, food_combining_calculatorCalculatorResults> {
  readonly id = 'food_combining_calculatorCalculator';
  readonly name = 'food_combining_calculatorCalculator Calculator';
  readonly description = 'Calculate food_combining_calculatorCalculator values';

  calculate(inputs: food_combining_calculatorCalculatorInputs): food_combining_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: food_combining_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: food_combining_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
