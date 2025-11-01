import { Calculator } from '../../engines/CalculatorEngine';
import { debtconsolidationloancalculatorInputs, debtconsolidationloancalculatorOutputs } from './types';
import { calculatedebtconsolidationloancalculatorResults } from './formulas';
import { validatedebtconsolidationloancalculatorInputs } from './validation';

export class debtconsolidationloancalculator implements Calculator<
  debtconsolidationloancalculatorInputs,
  debtconsolidationloancalculatorOutputs
> {
  readonly id = 'debt_consolidation_loan_calculator_calculator';
  readonly name = 'debt consolidation loan calculator Calculator';
  readonly description = 'Professional debt consolidation loan calculator calculator with domain-specific functionality';

  calculate(inputs: debtconsolidationloancalculatorInputs): debtconsolidationloancalculatorOutputs {
    const validation = validatedebtconsolidationloancalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatedebtconsolidationloancalculatorResults(inputs);
  }

  validateInputs(inputs: debtconsolidationloancalculatorInputs): boolean {
    const validation = validatedebtconsolidationloancalculatorInputs(inputs);
    return validation.isValid;
  }
}
