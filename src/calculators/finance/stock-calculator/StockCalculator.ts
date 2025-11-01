import { Calculator } from '../../engines/CalculatorEngine';
import { stockcalculatorInputs, stockcalculatorOutputs } from './types';
import { calculatestockcalculatorResults } from './formulas';
import { validatestockcalculatorInputs } from './validation';

export class stockcalculator implements Calculator<
  stockcalculatorInputs,
  stockcalculatorOutputs
> {
  readonly id = 'stock_calculator_calculator';
  readonly name = 'stock calculator Calculator';
  readonly description = 'Professional stock calculator calculator with domain-specific functionality';

  calculate(inputs: stockcalculatorInputs): stockcalculatorOutputs {
    const validation = validatestockcalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatestockcalculatorResults(inputs);
  }

  validateInputs(inputs: stockcalculatorInputs): boolean {
    const validation = validatestockcalculatorInputs(inputs);
    return validation.isValid;
  }
}
