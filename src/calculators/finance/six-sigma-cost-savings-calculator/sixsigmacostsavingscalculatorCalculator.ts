import { Calculator } from '../../engines/CalculatorEngine';
import { sixsigmacostsavingscalculatorCalculatorInputs, sixsigmacostsavingscalculatorCalculatorOutputs } from './types';
import { calculatesixsigmacostsavingscalculatorCalculatorResults } from './formulas';
import { validatesixsigmacostsavingscalculatorCalculatorInputs } from './validation';

export class sixsigmacostsavingscalculatorCalculator implements Calculator<
  sixsigmacostsavingscalculatorCalculatorInputs,
  sixsigmacostsavingscalculatorCalculatorOutputs
> {
  readonly id = 'six_sigma_cost_savings_calculator_calculator';
  readonly name = 'six sigma cost savings calculator Calculator';
  readonly description = 'Professional six sigma cost savings calculator calculator with domain-specific functionality';

  calculate(inputs: sixsigmacostsavingscalculatorCalculatorInputs): sixsigmacostsavingscalculatorCalculatorOutputs {
    const validation = validatesixsigmacostsavingscalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatesixsigmacostsavingscalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: sixsigmacostsavingscalculatorCalculatorInputs): boolean {
    const validation = validatesixsigmacostsavingscalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
