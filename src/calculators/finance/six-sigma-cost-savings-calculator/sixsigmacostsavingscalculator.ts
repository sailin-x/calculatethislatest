import { Calculator } from '../../engines/CalculatorEngine';
import { sixsigmacostsavingscalculatorInputs, sixsigmacostsavingscalculatorOutputs } from './types';
import { calculatesixsigmacostsavingscalculatorResults } from './formulas';
import { validatesixsigmacostsavingscalculatorInputs } from './validation';

export class sixsigmacostsavingscalculator implements Calculator<
  sixsigmacostsavingscalculatorInputs,
  sixsigmacostsavingscalculatorOutputs
> {
  readonly id = 'six_sigma_cost_savings_calculator_calculator';
  readonly name = 'six sigma cost savings calculator Calculator';
  readonly description = 'Professional six sigma cost savings calculator calculator with domain-specific functionality';

  calculate(inputs: sixsigmacostsavingscalculatorInputs): sixsigmacostsavingscalculatorOutputs {
    const validation = validatesixsigmacostsavingscalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatesixsigmacostsavingscalculatorResults(inputs);
  }

  validateInputs(inputs: sixsigmacostsavingscalculatorInputs): boolean {
    const validation = validatesixsigmacostsavingscalculatorInputs(inputs);
    return validation.isValid;
  }
}
