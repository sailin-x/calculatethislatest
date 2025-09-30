import { Calculator } from '../../engines/CalculatorEngine';
import { stretchiracalculatorCalculatorInputs, stretchiracalculatorCalculatorOutputs } from './types';
import { calculatestretchiracalculatorCalculatorResults } from './formulas';
import { validatestretchiracalculatorCalculatorInputs } from './validation';

export class stretchiracalculatorCalculator implements Calculator<
  stretchiracalculatorCalculatorInputs,
  stretchiracalculatorCalculatorOutputs
> {
  readonly id = 'stretch_ira_calculator_calculator';
  readonly name = 'stretch ira calculator Calculator';
  readonly description = 'Professional stretch ira calculator calculator with domain-specific functionality';

  calculate(inputs: stretchiracalculatorCalculatorInputs): stretchiracalculatorCalculatorOutputs {
    const validation = validatestretchiracalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatestretchiracalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: stretchiracalculatorCalculatorInputs): boolean {
    const validation = validatestretchiracalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
