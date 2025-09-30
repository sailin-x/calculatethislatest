import { Calculator } from '../../engines/CalculatorEngine';
import { stockbuybackroicalculatorCalculatorInputs, stockbuybackroicalculatorCalculatorOutputs } from './types';
import { calculatestockbuybackroicalculatorCalculatorResults } from './formulas';
import { validatestockbuybackroicalculatorCalculatorInputs } from './validation';

export class stockbuybackroicalculatorCalculator implements Calculator<
  stockbuybackroicalculatorCalculatorInputs,
  stockbuybackroicalculatorCalculatorOutputs
> {
  readonly id = 'stock_buyback_roi_calculator_calculator';
  readonly name = 'stock buyback roi calculator Calculator';
  readonly description = 'Professional stock buyback roi calculator calculator with domain-specific functionality';

  calculate(inputs: stockbuybackroicalculatorCalculatorInputs): stockbuybackroicalculatorCalculatorOutputs {
    const validation = validatestockbuybackroicalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatestockbuybackroicalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: stockbuybackroicalculatorCalculatorInputs): boolean {
    const validation = validatestockbuybackroicalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
