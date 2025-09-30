import { Calculator } from '../../engines/CalculatorEngine';
import { HealthSavingsAccountHsaCalculatorInputs, HealthSavingsAccountHsaCalculatorResults, HealthSavingsAccountHsaCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class HealthSavingsAccountHsaCalculatorCalculator implements Calculator<HealthSavingsAccountHsaCalculatorInputs, HealthSavingsAccountHsaCalculatorResults> {
  readonly id = 'HealthSavingsAccountHsaCalculator';
  readonly name = 'HealthSavingsAccountHsaCalculator Calculator';
  readonly description = 'Calculate HealthSavingsAccountHsaCalculator values';

  calculate(inputs: HealthSavingsAccountHsaCalculatorInputs): HealthSavingsAccountHsaCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: HealthSavingsAccountHsaCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: HealthSavingsAccountHsaCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
