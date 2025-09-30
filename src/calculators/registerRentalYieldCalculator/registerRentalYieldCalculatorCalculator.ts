import { Calculator } from '../../engines/CalculatorEngine';
import { registerRentalYieldCalculatorInputs, registerRentalYieldCalculatorResults, registerRentalYieldCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerRentalYieldCalculatorCalculator implements Calculator<registerRentalYieldCalculatorInputs, registerRentalYieldCalculatorResults> {
  readonly id = 'registerRentalYieldCalculator';
  readonly name = 'registerRentalYieldCalculator Calculator';
  readonly description = 'Calculate registerRentalYieldCalculator values';

  calculate(inputs: registerRentalYieldCalculatorInputs): registerRentalYieldCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerRentalYieldCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerRentalYieldCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
