import { Calculator } from '../../engines/CalculatorEngine';
import { carloancalculatorInputs, carloancalculatorOutputs } from './types';
import { calculatecarloancalculatorResults } from './formulas';
import { validatecarloancalculatorInputs } from './validation';

export class carloancalculator implements Calculator<
  carloancalculatorInputs,
  carloancalculatorOutputs
> {
  readonly id = 'car_loan_calculator_calculator';
  readonly name = 'car loan calculator Calculator';
  readonly description = 'Professional car loan calculator calculator with domain-specific functionality';

  calculate(inputs: carloancalculatorInputs): carloancalculatorOutputs {
    const validation = validatecarloancalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatecarloancalculatorResults(inputs);
  }

  validateInputs(inputs: carloancalculatorInputs): boolean {
    const validation = validatecarloancalculatorInputs(inputs);
    return validation.isValid;
  }
}
