import { Calculator } from '../../engines/CalculatorEngine';
import { debtconsolidationloancalculatorCalculatorInputs, debtconsolidationloancalculatorCalculatorOutputs } from './types';
import { calculatedebtconsolidationloancalculatorCalculatorResults } from './formulas';
import { validatedebtconsolidationloancalculatorCalculatorInputs } from './validation';

export class debtconsolidationloancalculatorCalculator implements Calculator<
  debtconsolidationloancalculatorCalculatorInputs,
  debtconsolidationloancalculatorCalculatorOutputs
> {
  readonly id = 'debt_consolidation_loan_calculator_calculator';
  readonly name = 'debt consolidation loan calculator Calculator';
  readonly description = 'Professional debt consolidation loan calculator calculator with domain-specific functionality';

  calculate(inputs: debtconsolidationloancalculatorCalculatorInputs): debtconsolidationloancalculatorCalculatorOutputs {
    const validation = validatedebtconsolidationloancalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatedebtconsolidationloancalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: debtconsolidationloancalculatorCalculatorInputs): boolean {
    const validation = validatedebtconsolidationloancalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
