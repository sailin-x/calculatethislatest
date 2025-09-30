import { Calculator } from '../../engines/CalculatorEngine';
import { cloudrepatriationsavingscalculatorCalculatorInputs, cloudrepatriationsavingscalculatorCalculatorOutputs } from './types';
import { calculatecloudrepatriationsavingscalculatorCalculatorResults } from './formulas';
import { validatecloudrepatriationsavingscalculatorCalculatorInputs } from './validation';

export class cloudrepatriationsavingscalculatorCalculator implements Calculator<
  cloudrepatriationsavingscalculatorCalculatorInputs,
  cloudrepatriationsavingscalculatorCalculatorOutputs
> {
  readonly id = 'cloud_repatriation_savings_calculator_calculator';
  readonly name = 'cloud repatriation savings calculator Calculator';
  readonly description = 'Professional cloud repatriation savings calculator calculator with domain-specific functionality';

  calculate(inputs: cloudrepatriationsavingscalculatorCalculatorInputs): cloudrepatriationsavingscalculatorCalculatorOutputs {
    const validation = validatecloudrepatriationsavingscalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatecloudrepatriationsavingscalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: cloudrepatriationsavingscalculatorCalculatorInputs): boolean {
    const validation = validatecloudrepatriationsavingscalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
