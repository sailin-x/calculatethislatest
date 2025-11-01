import { Calculator } from '../../engines/CalculatorEngine';
import { paydayloancalculatorInputs, paydayloancalculatorOutputs } from './types';
import { calculatepaydayloancalculatorResults } from './formulas';
import { validatepaydayloancalculatorInputs } from './validation';

export class paydayloancalculator implements Calculator<
  paydayloancalculatorInputs,
  paydayloancalculatorOutputs
> {
  readonly id = 'payday_loan_calculator_calculator';
  readonly name = 'payday loan calculator Calculator';
  readonly description = 'Professional payday loan calculator calculator with domain-specific functionality';

  calculate(inputs: paydayloancalculatorInputs): paydayloancalculatorOutputs {
    const validation = validatepaydayloancalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatepaydayloancalculatorResults(inputs);
  }

  validateInputs(inputs: paydayloancalculatorInputs): boolean {
    const validation = validatepaydayloancalculatorInputs(inputs);
    return validation.isValid;
  }
}
