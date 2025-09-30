import { Calculator } from '../../engines/CalculatorEngine';
import { ground_lease_valuationCalculatorInputs, ground_lease_valuationCalculatorResults, ground_lease_valuationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class ground_lease_valuationCalculatorCalculator implements Calculator<ground_lease_valuationCalculatorInputs, ground_lease_valuationCalculatorResults> {
  readonly id = 'ground_lease_valuationCalculator';
  readonly name = 'ground_lease_valuationCalculator Calculator';
  readonly description = 'Calculate ground_lease_valuationCalculator values';

  calculate(inputs: ground_lease_valuationCalculatorInputs): ground_lease_valuationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: ground_lease_valuationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: ground_lease_valuationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
