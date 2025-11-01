import { Calculator } from '../../engines/CalculatorEngine';
import { loancalculatorInputs, loancalculatorOutputs } from './types';
import { calculateloancalculatorResults } from './formulas';
import { validateloancalculatorInputs } from './validation';

export class loancalculator implements Calculator<
  loancalculatorInputs,
  loancalculatorOutputs
> {
  readonly id = 'loan_calculator_calculator';
  readonly name = 'loan calculator Calculator';
  readonly description = 'Professional loan calculator calculator with domain-specific functionality';

  calculate(inputs: loancalculatorInputs): loancalculatorOutputs {
    const validation = validateloancalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculateloancalculatorResults(inputs);
  }

  validateInputs(inputs: loancalculatorInputs): boolean {
    const validation = validateloancalculatorInputs(inputs);
    return validation.isValid;
  }
}
