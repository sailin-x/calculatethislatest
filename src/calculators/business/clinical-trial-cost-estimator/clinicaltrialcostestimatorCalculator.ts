import { Calculator } from '../../engines/CalculatorEngine';
import { clinicaltrialcostestimatorCalculatorInputs, clinicaltrialcostestimatorCalculatorOutputs } from './types';
import { calculateclinicaltrialcostestimatorCalculatorResults } from './formulas';
import { validateclinicaltrialcostestimatorCalculatorInputs } from './validation';

export class clinicaltrialcostestimatorCalculator implements Calculator<
  clinicaltrialcostestimatorCalculatorInputs,
  clinicaltrialcostestimatorCalculatorOutputs
> {
  readonly id = 'clinical_trial_cost_estimator_calculator';
  readonly name = 'clinical trial cost estimator Calculator';
  readonly description = 'Professional clinical trial cost estimator calculator with domain-specific functionality';

  calculate(inputs: clinicaltrialcostestimatorCalculatorInputs): clinicaltrialcostestimatorCalculatorOutputs {
    const validation = validateclinicaltrialcostestimatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculateclinicaltrialcostestimatorCalculatorResults(inputs);
  }

  validateInputs(inputs: clinicaltrialcostestimatorCalculatorInputs): boolean {
    const validation = validateclinicaltrialcostestimatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
