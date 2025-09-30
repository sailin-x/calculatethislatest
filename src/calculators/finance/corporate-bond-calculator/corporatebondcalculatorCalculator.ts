import { Calculator } from '../../engines/CalculatorEngine';
import { corporatebondcalculatorCalculatorInputs, corporatebondcalculatorCalculatorOutputs } from './types';
import { calculatecorporatebondcalculatorCalculatorResults } from './formulas';
import { validatecorporatebondcalculatorCalculatorInputs } from './validation';

export class corporatebondcalculatorCalculator implements Calculator<
  corporatebondcalculatorCalculatorInputs,
  corporatebondcalculatorCalculatorOutputs
> {
  readonly id = 'corporate_bond_calculator_calculator';
  readonly name = 'corporate bond calculator Calculator';
  readonly description = 'Professional corporate bond calculator calculator with domain-specific functionality';

  calculate(inputs: corporatebondcalculatorCalculatorInputs): corporatebondcalculatorCalculatorOutputs {
    const validation = validatecorporatebondcalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatecorporatebondcalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: corporatebondcalculatorCalculatorInputs): boolean {
    const validation = validatecorporatebondcalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
