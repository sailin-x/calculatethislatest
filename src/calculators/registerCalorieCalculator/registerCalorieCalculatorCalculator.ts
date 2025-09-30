import { Calculator } from '../../engines/CalculatorEngine';
import { registerCalorieCalculatorInputs, registerCalorieCalculatorResults, registerCalorieCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerCalorieCalculatorCalculator implements Calculator<registerCalorieCalculatorInputs, registerCalorieCalculatorResults> {
  readonly id = 'registerCalorieCalculator';
  readonly name = 'registerCalorieCalculator Calculator';
  readonly description = 'Calculate registerCalorieCalculator values';

  calculate(inputs: registerCalorieCalculatorInputs): registerCalorieCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerCalorieCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerCalorieCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
