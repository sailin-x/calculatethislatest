import { Calculator } from '../../engines/CalculatorEngine';
import { traditionaliracalculatorCalculatorInputs, traditionaliracalculatorCalculatorOutputs } from './types';
import { calculatetraditionaliracalculatorCalculatorResults } from './formulas';
import { validatetraditionaliracalculatorCalculatorInputs } from './validation';

export class traditionaliracalculatorCalculator implements Calculator<
  traditionaliracalculatorCalculatorInputs,
  traditionaliracalculatorCalculatorOutputs
> {
  readonly id = 'traditional_ira_calculator_calculator';
  readonly name = 'traditional ira calculator Calculator';
  readonly description = 'Professional traditional ira calculator calculator with domain-specific functionality';

  calculate(inputs: traditionaliracalculatorCalculatorInputs): traditionaliracalculatorCalculatorOutputs {
    const validation = validatetraditionaliracalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatetraditionaliracalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: traditionaliracalculatorCalculatorInputs): boolean {
    const validation = validatetraditionaliracalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
