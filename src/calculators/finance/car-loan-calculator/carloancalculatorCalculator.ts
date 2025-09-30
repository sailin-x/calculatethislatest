import { Calculator } from '../../engines/CalculatorEngine';
import { carloancalculatorCalculatorInputs, carloancalculatorCalculatorOutputs } from './types';
import { calculatecarloancalculatorCalculatorResults } from './formulas';
import { validatecarloancalculatorCalculatorInputs } from './validation';

export class carloancalculatorCalculator implements Calculator<
  carloancalculatorCalculatorInputs,
  carloancalculatorCalculatorOutputs
> {
  readonly id = 'car_loan_calculator_calculator';
  readonly name = 'car loan calculator Calculator';
  readonly description = 'Professional car loan calculator calculator with domain-specific functionality';

  calculate(inputs: carloancalculatorCalculatorInputs): carloancalculatorCalculatorOutputs {
    const validation = validatecarloancalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatecarloancalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: carloancalculatorCalculatorInputs): boolean {
    const validation = validatecarloancalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
