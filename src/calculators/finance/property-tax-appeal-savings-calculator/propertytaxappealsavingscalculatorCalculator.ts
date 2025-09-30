import { Calculator } from '../../engines/CalculatorEngine';
import { propertytaxappealsavingscalculatorCalculatorInputs, propertytaxappealsavingscalculatorCalculatorOutputs } from './types';
import { calculatepropertytaxappealsavingscalculatorCalculatorResults } from './formulas';
import { validatepropertytaxappealsavingscalculatorCalculatorInputs } from './validation';

export class propertytaxappealsavingscalculatorCalculator implements Calculator<
  propertytaxappealsavingscalculatorCalculatorInputs,
  propertytaxappealsavingscalculatorCalculatorOutputs
> {
  readonly id = 'property_tax_appeal_savings_calculator_calculator';
  readonly name = 'property tax appeal savings calculator Calculator';
  readonly description = 'Professional property tax appeal savings calculator calculator with domain-specific functionality';

  calculate(inputs: propertytaxappealsavingscalculatorCalculatorInputs): propertytaxappealsavingscalculatorCalculatorOutputs {
    const validation = validatepropertytaxappealsavingscalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatepropertytaxappealsavingscalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: propertytaxappealsavingscalculatorCalculatorInputs): boolean {
    const validation = validatepropertytaxappealsavingscalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
