import { Calculator } from '../../engines/CalculatorEngine';
import { municipalbondcalculatorCalculatorInputs, municipalbondcalculatorCalculatorOutputs } from './types';
import { calculatemunicipalbondcalculatorCalculatorResults } from './formulas';
import { validatemunicipalbondcalculatorCalculatorInputs } from './validation';

export class municipalbondcalculatorCalculator implements Calculator<
  municipalbondcalculatorCalculatorInputs,
  municipalbondcalculatorCalculatorOutputs
> {
  readonly id = 'municipal_bond_calculator_calculator';
  readonly name = 'municipal bond calculator Calculator';
  readonly description = 'Professional municipal bond calculator calculator with domain-specific functionality';

  calculate(inputs: municipalbondcalculatorCalculatorInputs): municipalbondcalculatorCalculatorOutputs {
    const validation = validatemunicipalbondcalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatemunicipalbondcalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: municipalbondcalculatorCalculatorInputs): boolean {
    const validation = validatemunicipalbondcalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
