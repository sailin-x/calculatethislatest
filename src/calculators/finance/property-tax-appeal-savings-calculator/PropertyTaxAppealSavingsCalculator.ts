import { Calculator } from '../../engines/CalculatorEngine';
import { propertytaxappealsavingscalculatorInputs, propertytaxappealsavingscalculatorOutputs } from './types';
import { calculatepropertytaxappealsavingscalculatorResults } from './formulas';
import { validatepropertytaxappealsavingscalculatorInputs } from './validation';

export class propertytaxappealsavingscalculator implements Calculator<
  propertytaxappealsavingscalculatorInputs,
  propertytaxappealsavingscalculatorOutputs
> {
  readonly id = 'property_tax_appeal_savings_calculator_calculator';
  readonly name = 'property tax appeal savings calculator Calculator';
  readonly description = 'Professional property tax appeal savings calculator calculator with domain-specific functionality';

  calculate(inputs: propertytaxappealsavingscalculatorInputs): propertytaxappealsavingscalculatorOutputs {
    const validation = validatepropertytaxappealsavingscalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatepropertytaxappealsavingscalculatorResults(inputs);
  }

  validateInputs(inputs: propertytaxappealsavingscalculatorInputs): boolean {
    const validation = validatepropertytaxappealsavingscalculatorInputs(inputs);
    return validation.isValid;
  }
}

export const PropertyTaxAppealSavingsCalculator = propertytaxappealsavingscalculator;
