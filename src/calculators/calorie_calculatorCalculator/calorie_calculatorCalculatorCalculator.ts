import { Calculator } from '../../engines/CalculatorEngine';
import { calorie_calculatorCalculatorInputs, calorie_calculatorCalculatorResults, calorie_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class calorie_calculatorCalculatorCalculator implements Calculator<calorie_calculatorCalculatorInputs, calorie_calculatorCalculatorResults> {
  readonly id = 'calorie_calculatorCalculator';
  readonly name = 'calorie_calculatorCalculator Calculator';
  readonly description = 'Calculate calorie_calculatorCalculator values';

  calculate(inputs: calorie_calculatorCalculatorInputs): calorie_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: calorie_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: calorie_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
