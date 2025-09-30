import { Calculator } from '../../engines/CalculatorEngine';
import { preventativemaintenancesavingscalculatorCalculatorInputs, preventativemaintenancesavingscalculatorCalculatorOutputs } from './types';
import { calculatepreventativemaintenancesavingscalculatorCalculatorResults } from './formulas';
import { validatepreventativemaintenancesavingscalculatorCalculatorInputs } from './validation';

export class preventativemaintenancesavingscalculatorCalculator implements Calculator<
  preventativemaintenancesavingscalculatorCalculatorInputs,
  preventativemaintenancesavingscalculatorCalculatorOutputs
> {
  readonly id = 'preventative_maintenance_savings_calculator_calculator';
  readonly name = 'preventative maintenance savings calculator Calculator';
  readonly description = 'Professional preventative maintenance savings calculator calculator with domain-specific functionality';

  calculate(inputs: preventativemaintenancesavingscalculatorCalculatorInputs): preventativemaintenancesavingscalculatorCalculatorOutputs {
    const validation = validatepreventativemaintenancesavingscalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatepreventativemaintenancesavingscalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: preventativemaintenancesavingscalculatorCalculatorInputs): boolean {
    const validation = validatepreventativemaintenancesavingscalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
