import { Calculator } from '../../engines/CalculatorEngine';
import { employeestockoptionplanesopvaluationcalculatorInputs, employeestockoptionplanesopvaluationcalculatorOutputs } from './types';
import { calculateemployeestockoptionplanesopvaluationcalculatorResults } from './formulas';
import { validateemployeestockoptionplanesopvaluationcalculatorInputs } from './validation';

export class employeestockoptionplanesopvaluationcalculator implements Calculator<
  employeestockoptionplanesopvaluationcalculatorInputs,
  employeestockoptionplanesopvaluationcalculatorOutputs
> {
  readonly id = 'employee_stock_option_plan_esop_valuation_calculator_calculator';
  readonly name = 'employee stock option plan esop valuation calculator Calculator';
  readonly description = 'Professional employee stock option plan esop valuation calculator calculator with domain-specific functionality';

  calculate(inputs: employeestockoptionplanesopvaluationcalculatorInputs): employeestockoptionplanesopvaluationcalculatorOutputs {
    const validation = validateemployeestockoptionplanesopvaluationcalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculateemployeestockoptionplanesopvaluationcalculatorResults(inputs);
  }

  validateInputs(inputs: employeestockoptionplanesopvaluationcalculatorInputs): boolean {
    const validation = validateemployeestockoptionplanesopvaluationcalculatorInputs(inputs);
    return validation.isValid;
  }
}
