import { Calculator } from '../../engines/CalculatorEngine';
import { businessprocessreengineeringbprsavingscalculatorInputs, businessprocessreengineeringbprsavingscalculatorOutputs } from './types';
import { calculatebusinessprocessreengineeringbprsavingscalculatorResults } from './formulas';
import { validatebusinessprocessreengineeringbprsavingscalculatorInputs } from './validation';

export class businessprocessreengineeringbprsavingscalculator implements Calculator<
  businessprocessreengineeringbprsavingscalculatorInputs,
  businessprocessreengineeringbprsavingscalculatorOutputs
> {
  readonly id = 'business_process_re_engineering_bpr_savings_calculator_calculator';
  readonly name = 'business process re engineering bpr savings calculator Calculator';
  readonly description = 'Professional business process re engineering bpr savings calculator calculator with domain-specific functionality';

  calculate(inputs: businessprocessreengineeringbprsavingscalculatorInputs): businessprocessreengineeringbprsavingscalculatorOutputs {
    const validation = validatebusinessprocessreengineeringbprsavingscalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatebusinessprocessreengineeringbprsavingscalculatorResults(inputs);
  }

  validateInputs(inputs: businessprocessreengineeringbprsavingscalculatorInputs): boolean {
    const validation = validatebusinessprocessreengineeringbprsavingscalculatorInputs(inputs);
    return validation.isValid;
  }
}
