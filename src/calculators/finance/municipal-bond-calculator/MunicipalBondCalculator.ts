import { Calculator } from '../../engines/CalculatorEngine';
import { municipalbondcalculatorInputs, municipalbondcalculatorOutputs } from './types';
import { calculatemunicipalbondcalculatorResults } from './formulas';
import { validatemunicipalbondcalculatorInputs } from './validation';

export class municipalbondcalculator implements Calculator<
  municipalbondcalculatorInputs,
  municipalbondcalculatorOutputs
> {
  readonly id = 'municipal_bond_calculator_calculator';
  readonly name = 'municipal bond calculator Calculator';
  readonly description = 'Professional municipal bond calculator calculator with domain-specific functionality';

  calculate(inputs: municipalbondcalculatorInputs): municipalbondcalculatorOutputs {
    const validation = validatemunicipalbondcalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatemunicipalbondcalculatorResults(inputs);
  }

  validateInputs(inputs: municipalbondcalculatorInputs): boolean {
    const validation = validatemunicipalbondcalculatorInputs(inputs);
    return validation.isValid;
  }
}
