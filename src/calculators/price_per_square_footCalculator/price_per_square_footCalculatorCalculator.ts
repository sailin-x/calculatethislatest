import { Calculator } from '../../engines/CalculatorEngine';
import { price_per_square_footCalculatorInputs, price_per_square_footCalculatorResults, price_per_square_footCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class price_per_square_footCalculatorCalculator implements Calculator<price_per_square_footCalculatorInputs, price_per_square_footCalculatorResults> {
  readonly id = 'price_per_square_footCalculator';
  readonly name = 'price_per_square_footCalculator Calculator';
  readonly description = 'Calculate price_per_square_footCalculator values';

  calculate(inputs: price_per_square_footCalculatorInputs): price_per_square_footCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: price_per_square_footCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: price_per_square_footCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
