import { Calculator } from '../../engines/CalculatorEngine';
import { stockbuybackroicalculatorInputs, stockbuybackroicalculatorOutputs } from './types';
import { calculatestockbuybackroicalculatorResults } from './formulas';
import { validatestockbuybackroicalculatorInputs } from './validation';

export class stockbuybackroicalculator implements Calculator<
  stockbuybackroicalculatorInputs,
  stockbuybackroicalculatorOutputs
> {
  readonly id = 'stock_buyback_roi_calculator_calculator';
  readonly name = 'stock buyback roi calculator Calculator';
  readonly description = 'Professional stock buyback roi calculator calculator with domain-specific functionality';

  calculate(inputs: stockbuybackroicalculatorInputs): stockbuybackroicalculatorOutputs {
    const validation = validatestockbuybackroicalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatestockbuybackroicalculatorResults(inputs);
  }

  validateInputs(inputs: stockbuybackroicalculatorInputs): boolean {
    const validation = validatestockbuybackroicalculatorInputs(inputs);
    return validation.isValid;
  }
}
