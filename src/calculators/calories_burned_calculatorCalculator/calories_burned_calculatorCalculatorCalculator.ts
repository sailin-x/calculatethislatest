import { Calculator } from '../../engines/CalculatorEngine';
import { calories_burned_calculatorCalculatorInputs, calories_burned_calculatorCalculatorResults, calories_burned_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class calories_burned_calculatorCalculatorCalculator implements Calculator<calories_burned_calculatorCalculatorInputs, calories_burned_calculatorCalculatorResults> {
  readonly id = 'calories_burned_calculatorCalculator';
  readonly name = 'calories_burned_calculatorCalculator Calculator';
  readonly description = 'Calculate calories_burned_calculatorCalculator values';

  calculate(inputs: calories_burned_calculatorCalculatorInputs): calories_burned_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: calories_burned_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: calories_burned_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
