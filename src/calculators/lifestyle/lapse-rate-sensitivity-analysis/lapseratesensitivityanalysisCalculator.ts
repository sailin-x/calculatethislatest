import { Calculator } from '../../engines/CalculatorEngine';
import { lapseratesensitivityanalysisCalculatorInputs, lapseratesensitivityanalysisCalculatorOutputs } from './types';
import { calculatelapseratesensitivityanalysisCalculatorResults } from './formulas';
import { validatelapseratesensitivityanalysisCalculatorInputs } from './validation';

export class lapseratesensitivityanalysisCalculator implements Calculator<
  lapseratesensitivityanalysisCalculatorInputs,
  lapseratesensitivityanalysisCalculatorOutputs
> {
  readonly id = 'lapse_rate_sensitivity_analysis_calculator';
  readonly name = 'lapse rate sensitivity analysis Calculator';
  readonly description = 'Professional lapse rate sensitivity analysis calculator with domain-specific functionality';

  calculate(inputs: lapseratesensitivityanalysisCalculatorInputs): lapseratesensitivityanalysisCalculatorOutputs {
    const validation = validatelapseratesensitivityanalysisCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatelapseratesensitivityanalysisCalculatorResults(inputs);
  }

  validateInputs(inputs: lapseratesensitivityanalysisCalculatorInputs): boolean {
    const validation = validatelapseratesensitivityanalysisCalculatorInputs(inputs);
    return validation.isValid;
  }
}
