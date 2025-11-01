import { Calculator } from '../../engines/CalculatorEngine';
import { rothiracalculatorInputs, rothiracalculatorOutputs } from './types';
import { calculaterothiracalculatorResults } from './formulas';
import { validaterothiracalculatorInputs } from './validation';

export class rothiracalculator implements Calculator<
  rothiracalculatorInputs,
  rothiracalculatorOutputs
> {
  readonly id = 'roth_ira_calculator_calculator';
  readonly name = 'roth ira calculator Calculator';
  readonly description = 'Professional roth ira calculator calculator with domain-specific functionality';

  calculate(inputs: rothiracalculatorInputs): rothiracalculatorOutputs {
    const validation = validaterothiracalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculaterothiracalculatorResults(inputs);
  }

  validateInputs(inputs: rothiracalculatorInputs): boolean {
    const validation = validaterothiracalculatorInputs(inputs);
    return validation.isValid;
  }
}
