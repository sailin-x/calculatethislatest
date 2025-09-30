import { Calculator } from '../../engines/CalculatorEngine';
import { paydayloancalculatorCalculatorInputs, paydayloancalculatorCalculatorOutputs } from './types';
import { calculatepaydayloancalculatorCalculatorResults } from './formulas';
import { validatepaydayloancalculatorCalculatorInputs } from './validation';

export class paydayloancalculatorCalculator implements Calculator<
  paydayloancalculatorCalculatorInputs,
  paydayloancalculatorCalculatorOutputs
> {
  readonly id = 'payday_loan_calculator_calculator';
  readonly name = 'payday loan calculator Calculator';
  readonly description = 'Professional payday loan calculator calculator with domain-specific functionality';

  calculate(inputs: paydayloancalculatorCalculatorInputs): paydayloancalculatorCalculatorOutputs {
    const validation = validatepaydayloancalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatepaydayloancalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: paydayloancalculatorCalculatorInputs): boolean {
    const validation = validatepaydayloancalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
