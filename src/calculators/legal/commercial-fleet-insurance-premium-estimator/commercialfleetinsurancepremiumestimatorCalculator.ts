import { Calculator } from '../../engines/CalculatorEngine';
import { commercialfleetinsurancepremiumestimatorCalculatorInputs, commercialfleetinsurancepremiumestimatorCalculatorOutputs } from './types';
import { calculatecommercialfleetinsurancepremiumestimatorCalculatorResults } from './formulas';
import { validatecommercialfleetinsurancepremiumestimatorCalculatorInputs } from './validation';

export class commercialfleetinsurancepremiumestimatorCalculator implements Calculator<
  commercialfleetinsurancepremiumestimatorCalculatorInputs,
  commercialfleetinsurancepremiumestimatorCalculatorOutputs
> {
  readonly id = 'commercial_fleet_insurance_premium_estimator_calculator';
  readonly name = 'commercial fleet insurance premium estimator Calculator';
  readonly description = 'Professional commercial fleet insurance premium estimator calculator with domain-specific functionality';

  calculate(inputs: commercialfleetinsurancepremiumestimatorCalculatorInputs): commercialfleetinsurancepremiumestimatorCalculatorOutputs {
    const validation = validatecommercialfleetinsurancepremiumestimatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatecommercialfleetinsurancepremiumestimatorCalculatorResults(inputs);
  }

  validateInputs(inputs: commercialfleetinsurancepremiumestimatorCalculatorInputs): boolean {
    const validation = validatecommercialfleetinsurancepremiumestimatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
