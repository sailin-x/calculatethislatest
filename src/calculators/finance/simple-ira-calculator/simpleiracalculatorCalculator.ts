import { Calculator } from '../../engines/CalculatorEngine';
import { simpleiracalculatorCalculatorInputs, simpleiracalculatorCalculatorOutputs } from './types';
import { calculatesimpleiracalculatorCalculatorResults } from './formulas';
import { validatesimpleiracalculatorCalculatorInputs } from './validation';

export class simpleiracalculatorCalculator implements Calculator<
  simpleiracalculatorCalculatorInputs,
  simpleiracalculatorCalculatorOutputs
> {
  readonly id = 'simple_ira_calculator_calculator';
  readonly name = 'simple ira calculator Calculator';
  readonly description = 'Professional simple ira calculator calculator with domain-specific functionality';

  calculate(inputs: simpleiracalculatorCalculatorInputs): simpleiracalculatorCalculatorOutputs {
    const validation = validatesimpleiracalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatesimpleiracalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: simpleiracalculatorCalculatorInputs): boolean {
    const validation = validatesimpleiracalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
