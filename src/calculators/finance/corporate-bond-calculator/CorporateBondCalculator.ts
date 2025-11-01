import { Calculator } from '../../engines/CalculatorEngine';
import { corporatebondcalculatorInputs, corporatebondcalculatorOutputs } from './types';
import { calculatecorporatebondcalculatorResults } from './formulas';
import { validatecorporatebondcalculatorInputs } from './validation';

export class corporatebondcalculator implements Calculator<
  corporatebondcalculatorInputs,
  corporatebondcalculatorOutputs
> {
  readonly id = 'corporate_bond_calculator_calculator';
  readonly name = 'corporate bond calculator Calculator';
  readonly description = 'Professional corporate bond calculator calculator with domain-specific functionality';

  calculate(inputs: corporatebondcalculatorInputs): corporatebondcalculatorOutputs {
    const validation = validatecorporatebondcalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatecorporatebondcalculatorResults(inputs);
  }

  validateInputs(inputs: corporatebondcalculatorInputs): boolean {
    const validation = validatecorporatebondcalculatorInputs(inputs);
    return validation.isValid;
  }
}
