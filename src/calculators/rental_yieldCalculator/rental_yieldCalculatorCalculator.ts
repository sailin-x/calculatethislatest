import { Calculator } from '../../engines/CalculatorEngine';
import { rental_yieldCalculatorInputs, rental_yieldCalculatorResults, rental_yieldCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class rental_yieldCalculatorCalculator implements Calculator<rental_yieldCalculatorInputs, rental_yieldCalculatorResults> {
  readonly id = 'rental_yieldCalculator';
  readonly name = 'rental_yieldCalculator Calculator';
  readonly description = 'Calculate rental_yieldCalculator values';

  calculate(inputs: rental_yieldCalculatorInputs): rental_yieldCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: rental_yieldCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: rental_yieldCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
