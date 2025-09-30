import { Calculator } from '../../engines/CalculatorEngine';
import { incurredbutnotreportedibnrreserveestimatorCalculatorInputs, incurredbutnotreportedibnrreserveestimatorCalculatorOutputs } from './types';
import { calculateincurredbutnotreportedibnrreserveestimatorCalculatorResults } from './formulas';
import { validateincurredbutnotreportedibnrreserveestimatorCalculatorInputs } from './validation';

export class incurredbutnotreportedibnrreserveestimatorCalculator implements Calculator<
  incurredbutnotreportedibnrreserveestimatorCalculatorInputs,
  incurredbutnotreportedibnrreserveestimatorCalculatorOutputs
> {
  readonly id = 'incurred_but_not_reported_ibnr_reserve_estimator_calculator';
  readonly name = 'incurred but not reported ibnr reserve estimator Calculator';
  readonly description = 'Professional incurred but not reported ibnr reserve estimator calculator with domain-specific functionality';

  calculate(inputs: incurredbutnotreportedibnrreserveestimatorCalculatorInputs): incurredbutnotreportedibnrreserveestimatorCalculatorOutputs {
    const validation = validateincurredbutnotreportedibnrreserveestimatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculateincurredbutnotreportedibnrreserveestimatorCalculatorResults(inputs);
  }

  validateInputs(inputs: incurredbutnotreportedibnrreserveestimatorCalculatorInputs): boolean {
    const validation = validateincurredbutnotreportedibnrreserveestimatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
