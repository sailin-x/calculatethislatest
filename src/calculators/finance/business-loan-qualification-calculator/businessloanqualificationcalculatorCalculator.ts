import { Calculator } from '../../engines/CalculatorEngine';
import { businessloanqualificationcalculatorCalculatorInputs, businessloanqualificationcalculatorCalculatorOutputs } from './types';
import { calculatebusinessloanqualificationcalculatorCalculatorResults } from './formulas';
import { validatebusinessloanqualificationcalculatorCalculatorInputs } from './validation';

export class businessloanqualificationcalculatorCalculator implements Calculator<
  businessloanqualificationcalculatorCalculatorInputs,
  businessloanqualificationcalculatorCalculatorOutputs
> {
  readonly id = 'business_loan_qualification_calculator_calculator';
  readonly name = 'business loan qualification calculator Calculator';
  readonly description = 'Professional business loan qualification calculator calculator with domain-specific functionality';

  calculate(inputs: businessloanqualificationcalculatorCalculatorInputs): businessloanqualificationcalculatorCalculatorOutputs {
    const validation = validatebusinessloanqualificationcalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatebusinessloanqualificationcalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: businessloanqualificationcalculatorCalculatorInputs): boolean {
    const validation = validatebusinessloanqualificationcalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
