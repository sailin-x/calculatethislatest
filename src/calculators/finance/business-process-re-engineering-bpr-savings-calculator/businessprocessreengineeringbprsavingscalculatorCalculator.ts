import { Calculator } from '../../engines/CalculatorEngine';
import { businessprocessreengineeringbprsavingscalculatorCalculatorInputs, businessprocessreengineeringbprsavingscalculatorCalculatorOutputs } from './types';
import { calculatebusinessprocessreengineeringbprsavingscalculatorCalculatorResults } from './formulas';
import { validatebusinessprocessreengineeringbprsavingscalculatorCalculatorInputs } from './validation';

export class businessprocessreengineeringbprsavingscalculatorCalculator implements Calculator<
  businessprocessreengineeringbprsavingscalculatorCalculatorInputs,
  businessprocessreengineeringbprsavingscalculatorCalculatorOutputs
> {
  readonly id = 'business_process_re_engineering_bpr_savings_calculator_calculator';
  readonly name = 'business process re engineering bpr savings calculator Calculator';
  readonly description = 'Professional business process re engineering bpr savings calculator calculator with domain-specific functionality';

  calculate(inputs: businessprocessreengineeringbprsavingscalculatorCalculatorInputs): businessprocessreengineeringbprsavingscalculatorCalculatorOutputs {
    const validation = validatebusinessprocessreengineeringbprsavingscalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatebusinessprocessreengineeringbprsavingscalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: businessprocessreengineeringbprsavingscalculatorCalculatorInputs): boolean {
    const validation = validatebusinessprocessreengineeringbprsavingscalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
