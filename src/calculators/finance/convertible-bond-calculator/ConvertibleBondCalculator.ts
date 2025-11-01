import { Calculator } from '../../engines/CalculatorEngine';
import { convertiblebondcalculatorInputs, convertiblebondcalculatorOutputs } from './types';
import { calculateconvertiblebondcalculatorResults } from './formulas';
import { validateconvertiblebondcalculatorInputs } from './validation';

export class convertiblebondcalculator implements Calculator<
  convertiblebondcalculatorInputs,
  convertiblebondcalculatorOutputs
> {
  readonly id = 'convertible_bond_calculator_calculator';
  readonly name = 'convertible bond calculator Calculator';
  readonly description = 'Professional convertible bond calculator calculator with domain-specific functionality';

  calculate(inputs: convertiblebondcalculatorInputs): convertiblebondcalculatorOutputs {
    const validation = validateconvertiblebondcalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculateconvertiblebondcalculatorResults(inputs);
  }

  validateInputs(inputs: convertiblebondcalculatorInputs): boolean {
    const validation = validateconvertiblebondcalculatorInputs(inputs);
    return validation.isValid;
  }
}
