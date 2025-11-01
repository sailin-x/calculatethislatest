import { Calculator } from '../../engines/CalculatorEngine';
import { suretybondpremiumcalculatorInputs, suretybondpremiumcalculatorOutputs } from './types';
import { calculatesuretybondpremiumcalculatorResults } from './formulas';
import { validatesuretybondpremiumcalculatorInputs } from './validation';

export class suretybondpremiumcalculator implements Calculator<
  suretybondpremiumcalculatorInputs,
  suretybondpremiumcalculatorOutputs
> {
  readonly id = 'surety_bond_premium_calculator_calculator';
  readonly name = 'surety bond premium calculator Calculator';
  readonly description = 'Professional surety bond premium calculator calculator with domain-specific functionality';

  calculate(inputs: suretybondpremiumcalculatorInputs): suretybondpremiumcalculatorOutputs {
    const validation = validatesuretybondpremiumcalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatesuretybondpremiumcalculatorResults(inputs);
  }

  validateInputs(inputs: suretybondpremiumcalculatorInputs): boolean {
    const validation = validatesuretybondpremiumcalculatorInputs(inputs);
    return validation.isValid;
  }
}
