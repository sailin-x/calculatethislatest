import { Calculator } from '../../engines/CalculatorEngine';
import { cloudrepatriationsavingscalculatorInputs, cloudrepatriationsavingscalculatorOutputs } from './types';
import { calculatecloudrepatriationsavingscalculatorResults } from './formulas';
import { validatecloudrepatriationsavingscalculatorInputs } from './validation';

export class cloudrepatriationsavingscalculator implements Calculator<
  cloudrepatriationsavingscalculatorInputs,
  cloudrepatriationsavingscalculatorOutputs
> {
  readonly id = 'cloud_repatriation_savings_calculator_calculator';
  readonly name = 'cloud repatriation savings calculator Calculator';
  readonly description = 'Professional cloud repatriation savings calculator calculator with domain-specific functionality';

  calculate(inputs: cloudrepatriationsavingscalculatorInputs): cloudrepatriationsavingscalculatorOutputs {
    const validation = validatecloudrepatriationsavingscalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatecloudrepatriationsavingscalculatorResults(inputs);
  }

  validateInputs(inputs: cloudrepatriationsavingscalculatorInputs): boolean {
    const validation = validatecloudrepatriationsavingscalculatorInputs(inputs);
    return validation.isValid;
  }
}
