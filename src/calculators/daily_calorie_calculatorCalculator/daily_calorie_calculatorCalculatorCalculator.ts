import { Calculator } from '../../engines/CalculatorEngine';
import { daily_calorie_calculatorCalculatorInputs, daily_calorie_calculatorCalculatorResults, daily_calorie_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class daily_calorie_calculatorCalculatorCalculator implements Calculator<daily_calorie_calculatorCalculatorInputs, daily_calorie_calculatorCalculatorResults> {
  readonly id = 'daily_calorie_calculatorCalculator';
  readonly name = 'daily_calorie_calculatorCalculator Calculator';
  readonly description = 'Calculate daily_calorie_calculatorCalculator values';

  calculate(inputs: daily_calorie_calculatorCalculatorInputs): daily_calorie_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: daily_calorie_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: daily_calorie_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
