import { Calculator } from '../../engines/CalculatorEngine';
import { bondyieldcalculatorCalculatorInputs, bondyieldcalculatorCalculatorOutputs } from './types';
import { calculatebondyieldcalculatorCalculatorResults } from './formulas';
import { validatebondyieldcalculatorCalculatorInputs } from './validation';

export class bondyieldcalculatorCalculator implements Calculator<
  bondyieldcalculatorCalculatorInputs,
  bondyieldcalculatorCalculatorOutputs
> {
  readonly id = 'bond_yield_calculator_calculator';
  readonly name = 'bond yield calculator Calculator';
  readonly description = 'Professional bond yield calculator calculator with domain-specific functionality';

  calculate(inputs: bondyieldcalculatorCalculatorInputs): bondyieldcalculatorCalculatorOutputs {
    const validation = validatebondyieldcalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatebondyieldcalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: bondyieldcalculatorCalculatorInputs): boolean {
    const validation = validatebondyieldcalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
