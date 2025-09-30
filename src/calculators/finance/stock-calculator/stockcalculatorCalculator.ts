import { Calculator } from '../../engines/CalculatorEngine';
import { stockcalculatorCalculatorInputs, stockcalculatorCalculatorOutputs } from './types';
import { calculatestockcalculatorCalculatorResults } from './formulas';
import { validatestockcalculatorCalculatorInputs } from './validation';

export class stockcalculatorCalculator implements Calculator<
  stockcalculatorCalculatorInputs,
  stockcalculatorCalculatorOutputs
> {
  readonly id = 'stock_calculator_calculator';
  readonly name = 'stock calculator Calculator';
  readonly description = 'Professional stock calculator calculator with domain-specific functionality';

  calculate(inputs: stockcalculatorCalculatorInputs): stockcalculatorCalculatorOutputs {
    const validation = validatestockcalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatestockcalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: stockcalculatorCalculatorInputs): boolean {
    const validation = validatestockcalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
