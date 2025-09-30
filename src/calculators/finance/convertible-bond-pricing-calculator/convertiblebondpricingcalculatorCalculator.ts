import { Calculator } from '../../engines/CalculatorEngine';
import { convertiblebondpricingcalculatorCalculatorInputs, convertiblebondpricingcalculatorCalculatorOutputs } from './types';
import { calculateconvertiblebondpricingcalculatorCalculatorResults } from './formulas';
import { validateconvertiblebondpricingcalculatorCalculatorInputs } from './validation';

export class convertiblebondpricingcalculatorCalculator implements Calculator<
  convertiblebondpricingcalculatorCalculatorInputs,
  convertiblebondpricingcalculatorCalculatorOutputs
> {
  readonly id = 'convertible_bond_pricing_calculator_calculator';
  readonly name = 'convertible bond pricing calculator Calculator';
  readonly description = 'Professional convertible bond pricing calculator calculator with domain-specific functionality';

  calculate(inputs: convertiblebondpricingcalculatorCalculatorInputs): convertiblebondpricingcalculatorCalculatorOutputs {
    const validation = validateconvertiblebondpricingcalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculateconvertiblebondpricingcalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: convertiblebondpricingcalculatorCalculatorInputs): boolean {
    const validation = validateconvertiblebondpricingcalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
