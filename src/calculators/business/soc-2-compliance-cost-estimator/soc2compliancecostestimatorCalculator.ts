import { Calculator } from '../../engines/CalculatorEngine';
import { soc2compliancecostestimatorCalculatorInputs, soc2compliancecostestimatorCalculatorOutputs } from './types';
import { calculatesoc2compliancecostestimatorCalculatorResults } from './formulas';
import { validatesoc2compliancecostestimatorCalculatorInputs } from './validation';

export class soc2compliancecostestimatorCalculator implements Calculator<
  soc2compliancecostestimatorCalculatorInputs,
  soc2compliancecostestimatorCalculatorOutputs
> {
  readonly id = 'soc_2_compliance_cost_estimator_calculator';
  readonly name = 'soc 2 compliance cost estimator Calculator';
  readonly description = 'Professional soc 2 compliance cost estimator calculator with domain-specific functionality';

  calculate(inputs: soc2compliancecostestimatorCalculatorInputs): soc2compliancecostestimatorCalculatorOutputs {
    const validation = validatesoc2compliancecostestimatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatesoc2compliancecostestimatorCalculatorResults(inputs);
  }

  validateInputs(inputs: soc2compliancecostestimatorCalculatorInputs): boolean {
    const validation = validatesoc2compliancecostestimatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
