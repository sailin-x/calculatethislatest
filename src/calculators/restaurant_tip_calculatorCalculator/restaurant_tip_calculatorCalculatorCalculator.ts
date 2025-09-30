import { Calculator } from '../../engines/CalculatorEngine';
import { restaurant_tip_calculatorCalculatorInputs, restaurant_tip_calculatorCalculatorResults, restaurant_tip_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class restaurant_tip_calculatorCalculatorCalculator implements Calculator<restaurant_tip_calculatorCalculatorInputs, restaurant_tip_calculatorCalculatorResults> {
  readonly id = 'restaurant_tip_calculatorCalculator';
  readonly name = 'restaurant_tip_calculatorCalculator Calculator';
  readonly description = 'Calculate restaurant_tip_calculatorCalculator values';

  calculate(inputs: restaurant_tip_calculatorCalculatorInputs): restaurant_tip_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: restaurant_tip_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: restaurant_tip_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
