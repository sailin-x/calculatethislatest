import { Calculator } from '../../engines/CalculatorEngine';
import { businessloanqualificationcalculatorInputs, businessloanqualificationcalculatorOutputs } from './types';
import { calculatebusinessloanqualificationcalculatorResults } from './formulas';
import { validatebusinessloanqualificationcalculatorInputs } from './validation';

export class businessloanqualificationcalculator implements Calculator<
  businessloanqualificationcalculatorInputs,
  businessloanqualificationcalculatorOutputs
> {
  readonly id = 'business_loan_qualification_calculator_calculator';
  readonly name = 'business loan qualification calculator Calculator';
  readonly description = 'Professional business loan qualification calculator calculator with domain-specific functionality';

  calculate(inputs: businessloanqualificationcalculatorInputs): businessloanqualificationcalculatorOutputs {
    const validation = validatebusinessloanqualificationcalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatebusinessloanqualificationcalculatorResults(inputs);
  }

  validateInputs(inputs: businessloanqualificationcalculatorInputs): boolean {
    const validation = validatebusinessloanqualificationcalculatorInputs(inputs);
    return validation.isValid;
  }
}
