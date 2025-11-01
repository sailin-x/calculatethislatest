import { Calculator } from '../../engines/CalculatorEngine';
import { simpleiracalculatorInputs, simpleiracalculatorOutputs } from './types';
import { calculatesimpleiracalculatorResults } from './formulas';
import { validatesimpleiracalculatorInputs } from './validation';

export class simpleiracalculator implements Calculator<
  simpleiracalculatorInputs,
  simpleiracalculatorOutputs
> {
  readonly id = 'simple_ira_calculator_calculator';
  readonly name = 'simple ira calculator Calculator';
  readonly description = 'Professional simple ira calculator calculator with domain-specific functionality';

  calculate(inputs: simpleiracalculatorInputs): simpleiracalculatorOutputs {
    const validation = validatesimpleiracalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatesimpleiracalculatorResults(inputs);
  }

  validateInputs(inputs: simpleiracalculatorInputs): boolean {
    const validation = validatesimpleiracalculatorInputs(inputs);
    return validation.isValid;
  }
}
