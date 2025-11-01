import { Calculator } from '../../engines/CalculatorEngine';
import { bondyieldcalculatorInputs, bondyieldcalculatorOutputs } from './types';
import { calculatebondyieldcalculatorResults } from './formulas';
import { validatebondyieldcalculatorInputs } from './validation';

export class bondyieldcalculator implements Calculator<
  bondyieldcalculatorInputs,
  bondyieldcalculatorOutputs
> {
  readonly id = 'bond_yield_calculator_calculator';
  readonly name = 'bond yield calculator Calculator';
  readonly description = 'Professional bond yield calculator calculator with domain-specific functionality';

  calculate(inputs: bondyieldcalculatorInputs): bondyieldcalculatorOutputs {
    const validation = validatebondyieldcalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatebondyieldcalculatorResults(inputs);
  }

  validateInputs(inputs: bondyieldcalculatorInputs): boolean {
    const validation = validatebondyieldcalculatorInputs(inputs);
    return validation.isValid;
  }
}
