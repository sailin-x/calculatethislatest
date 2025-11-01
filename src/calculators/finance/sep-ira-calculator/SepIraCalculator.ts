import { Calculator } from '../../engines/CalculatorEngine';
import { sepiracalculatorInputs, sepiracalculatorOutputs } from './types';
import { calculatesepiracalculatorResults } from './formulas';
import { validatesepiracalculatorInputs } from './validation';

export class sepiracalculator implements Calculator<
  sepiracalculatorInputs,
  sepiracalculatorOutputs
> {
  readonly id = 'sep_ira_calculator_calculator';
  readonly name = 'sep ira calculator Calculator';
  readonly description = 'Professional sep ira calculator calculator with domain-specific functionality';

  calculate(inputs: sepiracalculatorInputs): sepiracalculatorOutputs {
    const validation = validatesepiracalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatesepiracalculatorResults(inputs);
  }

  validateInputs(inputs: sepiracalculatorInputs): boolean {
    const validation = validatesepiracalculatorInputs(inputs);
    return validation.isValid;
  }
}
