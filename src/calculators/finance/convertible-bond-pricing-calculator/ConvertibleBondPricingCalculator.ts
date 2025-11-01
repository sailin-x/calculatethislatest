import { Calculator } from '../../engines/CalculatorEngine';
import { convertiblebondpricingcalculatorInputs, convertiblebondpricingcalculatorOutputs } from './types';
import { calculateconvertiblebondpricingcalculatorResults } from './formulas';
import { validateconvertiblebondpricingcalculatorInputs } from './validation';

export class convertiblebondpricingcalculator implements Calculator<
  convertiblebondpricingcalculatorInputs,
  convertiblebondpricingcalculatorOutputs
> {
  readonly id = 'convertible_bond_pricing_calculator_calculator';
  readonly name = 'convertible bond pricing calculator Calculator';
  readonly description = 'Professional convertible bond pricing calculator calculator with domain-specific functionality';

  calculate(inputs: convertiblebondpricingcalculatorInputs): convertiblebondpricingcalculatorOutputs {
    const validation = validateconvertiblebondpricingcalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculateconvertiblebondpricingcalculatorResults(inputs);
  }

  validateInputs(inputs: convertiblebondpricingcalculatorInputs): boolean {
    const validation = validateconvertiblebondpricingcalculatorInputs(inputs);
    return validation.isValid;
  }
}
