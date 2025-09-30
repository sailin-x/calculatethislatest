import { Calculator } from '../../engines/CalculatorEngine';
import { sepiracalculatorCalculatorInputs, sepiracalculatorCalculatorOutputs } from './types';
import { calculatesepiracalculatorCalculatorResults } from './formulas';
import { validatesepiracalculatorCalculatorInputs } from './validation';

export class sepiracalculatorCalculator implements Calculator<
  sepiracalculatorCalculatorInputs,
  sepiracalculatorCalculatorOutputs
> {
  readonly id = 'sep_ira_calculator_calculator';
  readonly name = 'sep ira calculator Calculator';
  readonly description = 'Professional sep ira calculator calculator with domain-specific functionality';

  calculate(inputs: sepiracalculatorCalculatorInputs): sepiracalculatorCalculatorOutputs {
    const validation = validatesepiracalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatesepiracalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: sepiracalculatorCalculatorInputs): boolean {
    const validation = validatesepiracalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
