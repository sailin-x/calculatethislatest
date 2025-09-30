import { Calculator } from '../../engines/CalculatorEngine';
import { loancomparisoncalculatorCalculatorInputs, loancomparisoncalculatorCalculatorOutputs } from './types';
import { calculateloancomparisoncalculatorCalculatorResults } from './formulas';
import { validateloancomparisoncalculatorCalculatorInputs } from './validation';

export class loancomparisoncalculatorCalculator implements Calculator<
  loancomparisoncalculatorCalculatorInputs,
  loancomparisoncalculatorCalculatorOutputs
> {
  readonly id = 'loan_comparison_calculator_calculator';
  readonly name = 'loan comparison calculator Calculator';
  readonly description = 'Professional loan comparison calculator calculator with domain-specific functionality';

  calculate(inputs: loancomparisoncalculatorCalculatorInputs): loancomparisoncalculatorCalculatorOutputs {
    const validation = validateloancomparisoncalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculateloancomparisoncalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: loancomparisoncalculatorCalculatorInputs): boolean {
    const validation = validateloancomparisoncalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
