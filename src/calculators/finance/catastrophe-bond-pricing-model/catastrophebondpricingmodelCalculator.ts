import { Calculator } from '../../engines/CalculatorEngine';
import { catastrophebondpricingmodelCalculatorInputs, catastrophebondpricingmodelCalculatorOutputs } from './types';
import { calculatecatastrophebondpricingmodelCalculatorResults } from './formulas';
import { validatecatastrophebondpricingmodelCalculatorInputs } from './validation';

export class catastrophebondpricingmodelCalculator implements Calculator<
  catastrophebondpricingmodelCalculatorInputs,
  catastrophebondpricingmodelCalculatorOutputs
> {
  readonly id = 'catastrophe_bond_pricing_model_calculator';
  readonly name = 'catastrophe bond pricing model Calculator';
  readonly description = 'Professional catastrophe bond pricing model calculator with domain-specific functionality';

  calculate(inputs: catastrophebondpricingmodelCalculatorInputs): catastrophebondpricingmodelCalculatorOutputs {
    const validation = validatecatastrophebondpricingmodelCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatecatastrophebondpricingmodelCalculatorResults(inputs);
  }

  validateInputs(inputs: catastrophebondpricingmodelCalculatorInputs): boolean {
    const validation = validatecatastrophebondpricingmodelCalculatorInputs(inputs);
    return validation.isValid;
  }
}
