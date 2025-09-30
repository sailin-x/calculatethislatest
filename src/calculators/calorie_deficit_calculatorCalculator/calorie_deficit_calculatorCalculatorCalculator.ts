import { Calculator } from '../../engines/CalculatorEngine';
import { calorie_deficit_calculatorCalculatorInputs, calorie_deficit_calculatorCalculatorResults, calorie_deficit_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class calorie_deficit_calculatorCalculatorCalculator implements Calculator<calorie_deficit_calculatorCalculatorInputs, calorie_deficit_calculatorCalculatorResults> {
  readonly id = 'calorie_deficit_calculatorCalculator';
  readonly name = 'calorie_deficit_calculatorCalculator Calculator';
  readonly description = 'Calculate calorie_deficit_calculatorCalculator values';

  calculate(inputs: calorie_deficit_calculatorCalculatorInputs): calorie_deficit_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: calorie_deficit_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: calorie_deficit_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
