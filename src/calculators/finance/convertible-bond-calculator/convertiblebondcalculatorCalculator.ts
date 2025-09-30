import { Calculator } from '../../engines/CalculatorEngine';
import { convertiblebondcalculatorCalculatorInputs, convertiblebondcalculatorCalculatorOutputs } from './types';
import { calculateconvertiblebondcalculatorCalculatorResults } from './formulas';
import { validateconvertiblebondcalculatorCalculatorInputs } from './validation';

export class convertiblebondcalculatorCalculator implements Calculator<
  convertiblebondcalculatorCalculatorInputs,
  convertiblebondcalculatorCalculatorOutputs
> {
  readonly id = 'convertible_bond_calculator_calculator';
  readonly name = 'convertible bond calculator Calculator';
  readonly description = 'Professional convertible bond calculator calculator with domain-specific functionality';

  calculate(inputs: convertiblebondcalculatorCalculatorInputs): convertiblebondcalculatorCalculatorOutputs {
    const validation = validateconvertiblebondcalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculateconvertiblebondcalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: convertiblebondcalculatorCalculatorInputs): boolean {
    const validation = validateconvertiblebondcalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
