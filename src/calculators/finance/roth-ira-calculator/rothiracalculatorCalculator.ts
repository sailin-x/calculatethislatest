import { Calculator } from '../../engines/CalculatorEngine';
import { rothiracalculatorCalculatorInputs, rothiracalculatorCalculatorOutputs } from './types';
import { calculaterothiracalculatorCalculatorResults } from './formulas';
import { validaterothiracalculatorCalculatorInputs } from './validation';

export class rothiracalculatorCalculator implements Calculator<
  rothiracalculatorCalculatorInputs,
  rothiracalculatorCalculatorOutputs
> {
  readonly id = 'roth_ira_calculator_calculator';
  readonly name = 'roth ira calculator Calculator';
  readonly description = 'Professional roth ira calculator calculator with domain-specific functionality';

  calculate(inputs: rothiracalculatorCalculatorInputs): rothiracalculatorCalculatorOutputs {
    const validation = validaterothiracalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculaterothiracalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: rothiracalculatorCalculatorInputs): boolean {
    const validation = validaterothiracalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
