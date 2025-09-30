import { Calculator } from '../../engines/CalculatorEngine';
import { employeestockoptionplanesopvaluationcalculatorCalculatorInputs, employeestockoptionplanesopvaluationcalculatorCalculatorOutputs } from './types';
import { calculateemployeestockoptionplanesopvaluationcalculatorCalculatorResults } from './formulas';
import { validateemployeestockoptionplanesopvaluationcalculatorCalculatorInputs } from './validation';

export class employeestockoptionplanesopvaluationcalculatorCalculator implements Calculator<
  employeestockoptionplanesopvaluationcalculatorCalculatorInputs,
  employeestockoptionplanesopvaluationcalculatorCalculatorOutputs
> {
  readonly id = 'employee_stock_option_plan_esop_valuation_calculator_calculator';
  readonly name = 'employee stock option plan esop valuation calculator Calculator';
  readonly description = 'Professional employee stock option plan esop valuation calculator calculator with domain-specific functionality';

  calculate(inputs: employeestockoptionplanesopvaluationcalculatorCalculatorInputs): employeestockoptionplanesopvaluationcalculatorCalculatorOutputs {
    const validation = validateemployeestockoptionplanesopvaluationcalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculateemployeestockoptionplanesopvaluationcalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: employeestockoptionplanesopvaluationcalculatorCalculatorInputs): boolean {
    const validation = validateemployeestockoptionplanesopvaluationcalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
