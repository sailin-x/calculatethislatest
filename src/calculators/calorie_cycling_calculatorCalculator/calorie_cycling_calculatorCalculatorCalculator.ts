import { Calculator } from '../../engines/CalculatorEngine';
import { calorie_cycling_calculatorCalculatorInputs, calorie_cycling_calculatorCalculatorResults, calorie_cycling_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class calorie_cycling_calculatorCalculatorCalculator implements Calculator<calorie_cycling_calculatorCalculatorInputs, calorie_cycling_calculatorCalculatorResults> {
  readonly id = 'calorie_cycling_calculatorCalculator';
  readonly name = 'calorie_cycling_calculatorCalculator Calculator';
  readonly description = 'Calculate calorie_cycling_calculatorCalculator values';

  calculate(inputs: calorie_cycling_calculatorCalculatorInputs): calorie_cycling_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: calorie_cycling_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: calorie_cycling_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
