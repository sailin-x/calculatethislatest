import { Calculator } from '../../engines/CalculatorEngine';
import { calorieCalculatorInputs, calorieCalculatorResults, calorieCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class calorieCalculatorCalculator implements Calculator<calorieCalculatorInputs, calorieCalculatorResults> {
  readonly id = 'calorieCalculator';
  readonly name = 'calorieCalculator Calculator';
  readonly description = 'Calculate calorieCalculator values';

  calculate(inputs: calorieCalculatorInputs): calorieCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: calorieCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: calorieCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
