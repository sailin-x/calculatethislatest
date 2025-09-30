import { Calculator } from '../../engines/CalculatorEngine';
import { loancalculatorCalculatorInputs, loancalculatorCalculatorOutputs } from './types';
import { calculateloancalculatorCalculatorResults } from './formulas';
import { validateloancalculatorCalculatorInputs } from './validation';

export class loancalculatorCalculator implements Calculator<
  loancalculatorCalculatorInputs,
  loancalculatorCalculatorOutputs
> {
  readonly id = 'loan_calculator_calculator';
  readonly name = 'loan calculator Calculator';
  readonly description = 'Professional loan calculator calculator with domain-specific functionality';

  calculate(inputs: loancalculatorCalculatorInputs): loancalculatorCalculatorOutputs {
    const validation = validateloancalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculateloancalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: loancalculatorCalculatorInputs): boolean {
    const validation = validateloancalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
