import { Calculator } from '../../engines/CalculatorEngine';
import { mergeracquisitionmadivestiturevaluationCalculatorInputs, mergeracquisitionmadivestiturevaluationCalculatorOutputs } from './types';
import { calculatemergeracquisitionmadivestiturevaluationCalculatorResults } from './formulas';
import { validatemergeracquisitionmadivestiturevaluationCalculatorInputs } from './validation';

export class mergeracquisitionmadivestiturevaluationCalculator implements Calculator<
  mergeracquisitionmadivestiturevaluationCalculatorInputs,
  mergeracquisitionmadivestiturevaluationCalculatorOutputs
> {
  readonly id = 'merger_acquisition_m_a_divestiture_valuation_calculator';
  readonly name = 'merger acquisition m a divestiture valuation Calculator';
  readonly description = 'Professional merger acquisition m a divestiture valuation calculator with domain-specific functionality';

  calculate(inputs: mergeracquisitionmadivestiturevaluationCalculatorInputs): mergeracquisitionmadivestiturevaluationCalculatorOutputs {
    const validation = validatemergeracquisitionmadivestiturevaluationCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatemergeracquisitionmadivestiturevaluationCalculatorResults(inputs);
  }

  validateInputs(inputs: mergeracquisitionmadivestiturevaluationCalculatorInputs): boolean {
    const validation = validatemergeracquisitionmadivestiturevaluationCalculatorInputs(inputs);
    return validation.isValid;
  }
}
