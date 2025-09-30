import { Calculator } from '../../engines/CalculatorEngine';
import { bariatricsurgerycostsavingscalculatorCalculatorInputs, bariatricsurgerycostsavingscalculatorCalculatorOutputs } from './types';
import { calculatebariatricsurgerycostsavingscalculatorCalculatorResults } from './formulas';
import { validatebariatricsurgerycostsavingscalculatorCalculatorInputs } from './validation';

export class bariatricsurgerycostsavingscalculatorCalculator implements Calculator<
  bariatricsurgerycostsavingscalculatorCalculatorInputs,
  bariatricsurgerycostsavingscalculatorCalculatorOutputs
> {
  readonly id = 'bariatric_surgery_cost_savings_calculator_calculator';
  readonly name = 'bariatric surgery cost savings calculator Calculator';
  readonly description = 'Professional bariatric surgery cost savings calculator calculator with domain-specific functionality';

  calculate(inputs: bariatricsurgerycostsavingscalculatorCalculatorInputs): bariatricsurgerycostsavingscalculatorCalculatorOutputs {
    const validation = validatebariatricsurgerycostsavingscalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatebariatricsurgerycostsavingscalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: bariatricsurgerycostsavingscalculatorCalculatorInputs): boolean {
    const validation = validatebariatricsurgerycostsavingscalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
