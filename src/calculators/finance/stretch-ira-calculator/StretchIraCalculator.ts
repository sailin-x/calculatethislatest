import { Calculator } from '../../engines/CalculatorEngine';
import { stretchiracalculatorInputs, stretchiracalculatorOutputs } from './types';
import { calculatestretchiracalculatorResults } from './formulas';
import { validatestretchiracalculatorInputs } from './validation';

export class stretchiracalculator implements Calculator<
  stretchiracalculatorInputs,
  stretchiracalculatorOutputs
> {
  readonly id = 'stretch_ira_calculator_calculator';
  readonly name = 'stretch ira calculator Calculator';
  readonly description = 'Professional stretch ira calculator calculator with domain-specific functionality';

  calculate(inputs: stretchiracalculatorInputs): stretchiracalculatorOutputs {
    const validation = validatestretchiracalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatestretchiracalculatorResults(inputs);
  }

  validateInputs(inputs: stretchiracalculatorInputs): boolean {
    const validation = validatestretchiracalculatorInputs(inputs);
    return validation.isValid;
  }
}
