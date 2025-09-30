import { Calculator } from '../../engines/CalculatorEngine';
import { commercial_lease_buyoutCalculatorInputs, commercial_lease_buyoutCalculatorResults, commercial_lease_buyoutCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class commercial_lease_buyoutCalculatorCalculator implements Calculator<commercial_lease_buyoutCalculatorInputs, commercial_lease_buyoutCalculatorResults> {
  readonly id = 'commercial_lease_buyoutCalculator';
  readonly name = 'commercial_lease_buyoutCalculator Calculator';
  readonly description = 'Calculate commercial_lease_buyoutCalculator values';

  calculate(inputs: commercial_lease_buyoutCalculatorInputs): commercial_lease_buyoutCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: commercial_lease_buyoutCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: commercial_lease_buyoutCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
