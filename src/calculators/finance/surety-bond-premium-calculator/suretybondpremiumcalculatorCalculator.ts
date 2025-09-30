import { Calculator } from '../../engines/CalculatorEngine';
import { suretybondpremiumcalculatorCalculatorInputs, suretybondpremiumcalculatorCalculatorOutputs } from './types';
import { calculatesuretybondpremiumcalculatorCalculatorResults } from './formulas';
import { validatesuretybondpremiumcalculatorCalculatorInputs } from './validation';

export class suretybondpremiumcalculatorCalculator implements Calculator<
  suretybondpremiumcalculatorCalculatorInputs,
  suretybondpremiumcalculatorCalculatorOutputs
> {
  readonly id = 'surety_bond_premium_calculator_calculator';
  readonly name = 'surety bond premium calculator Calculator';
  readonly description = 'Professional surety bond premium calculator calculator with domain-specific functionality';

  calculate(inputs: suretybondpremiumcalculatorCalculatorInputs): suretybondpremiumcalculatorCalculatorOutputs {
    const validation = validatesuretybondpremiumcalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatesuretybondpremiumcalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: suretybondpremiumcalculatorCalculatorInputs): boolean {
    const validation = validatesuretybondpremiumcalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
