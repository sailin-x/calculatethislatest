import { Calculator } from '../../engines/CalculatorEngine';
import { bariatricsurgerycostsavingscalculatorInputs, bariatricsurgerycostsavingscalculatorOutputs } from './types';
import { calculatebariatricsurgerycostsavingscalculatorResults } from './formulas';
import { validatebariatricsurgerycostsavingscalculatorInputs } from './validation';

export class bariatricsurgerycostsavingscalculator implements Calculator<
  bariatricsurgerycostsavingscalculatorInputs,
  bariatricsurgerycostsavingscalculatorOutputs
> {
  readonly id = 'bariatric_surgery_cost_savings_calculator_calculator';
  readonly name = 'bariatric surgery cost savings calculator Calculator';
  readonly description = 'Professional bariatric surgery cost savings calculator calculator with domain-specific functionality';

  calculate(inputs: bariatricsurgerycostsavingscalculatorInputs): bariatricsurgerycostsavingscalculatorOutputs {
    const validation = validatebariatricsurgerycostsavingscalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatebariatricsurgerycostsavingscalculatorResults(inputs);
  }

  validateInputs(inputs: bariatricsurgerycostsavingscalculatorInputs): boolean {
    const validation = validatebariatricsurgerycostsavingscalculatorInputs(inputs);
    return validation.isValid;
  }
}
