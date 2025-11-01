import { Calculator } from '../../engines/CalculatorEngine';
import { preventativemaintenancesavingscalculatorInputs, preventativemaintenancesavingscalculatorOutputs } from './types';
import { calculatepreventativemaintenancesavingscalculatorResults } from './formulas';
import { validatepreventativemaintenancesavingscalculatorInputs } from './validation';

export class preventativemaintenancesavingscalculator implements Calculator<
  preventativemaintenancesavingscalculatorInputs,
  preventativemaintenancesavingscalculatorOutputs
> {
  readonly id = 'preventative_maintenance_savings_calculator_calculator';
  readonly name = 'preventative maintenance savings calculator Calculator';
  readonly description = 'Professional preventative maintenance savings calculator calculator with domain-specific functionality';

  calculate(inputs: preventativemaintenancesavingscalculatorInputs): preventativemaintenancesavingscalculatorOutputs {
    const validation = validatepreventativemaintenancesavingscalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatepreventativemaintenancesavingscalculatorResults(inputs);
  }

  validateInputs(inputs: preventativemaintenancesavingscalculatorInputs): boolean {
    const validation = validatepreventativemaintenancesavingscalculatorInputs(inputs);
    return validation.isValid;
  }
}
