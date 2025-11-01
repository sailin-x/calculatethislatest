import { Calculator } from '../../engines/CalculatorEngine';
import { loancomparisoncalculatorInputs, loancomparisoncalculatorOutputs } from './types';
import { calculateloancomparisoncalculatorResults } from './formulas';
import { validateloancomparisoncalculatorInputs } from './validation';

export class loancomparisoncalculator implements Calculator<
  loancomparisoncalculatorInputs,
  loancomparisoncalculatorOutputs
> {
  readonly id = 'loan_comparison_calculator_calculator';
  readonly name = 'loan comparison calculator Calculator';
  readonly description = 'Professional loan comparison calculator calculator with domain-specific functionality';

  calculate(inputs: loancomparisoncalculatorInputs): loancomparisoncalculatorOutputs {
    const validation = validateloancomparisoncalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculateloancomparisoncalculatorResults(inputs);
  }

  validateInputs(inputs: loancomparisoncalculatorInputs): boolean {
    const validation = validateloancomparisoncalculatorInputs(inputs);
    return validation.isValid;
  }
}
