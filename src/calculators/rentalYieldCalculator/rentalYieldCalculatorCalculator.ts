import { Calculator } from '../../engines/CalculatorEngine';
import { rentalYieldCalculatorInputs, rentalYieldCalculatorResults, rentalYieldCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class rentalYieldCalculatorCalculator implements Calculator<rentalYieldCalculatorInputs, rentalYieldCalculatorResults> {
  readonly id = 'rentalYieldCalculator';
  readonly name = 'rentalYieldCalculator Calculator';
  readonly description = 'Calculate rentalYieldCalculator values';

  calculate(inputs: rentalYieldCalculatorInputs): rentalYieldCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: rentalYieldCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: rentalYieldCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
