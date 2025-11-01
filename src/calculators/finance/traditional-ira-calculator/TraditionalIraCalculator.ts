import { Calculator } from '../../engines/CalculatorEngine';
import { traditionaliracalculatorInputs, traditionaliracalculatorOutputs } from './types';
import { calculatetraditionaliracalculatorResults } from './formulas';
import { validatetraditionaliracalculatorInputs } from './validation';

export class traditionaliracalculator implements Calculator<
  traditionaliracalculatorInputs,
  traditionaliracalculatorOutputs
> {
  readonly id = 'traditional_ira_calculator_calculator';
  readonly name = 'traditional ira calculator Calculator';
  readonly description = 'Professional traditional ira calculator calculator with domain-specific functionality';

  calculate(inputs: traditionaliracalculatorInputs): traditionaliracalculatorOutputs {
    const validation = validatetraditionaliracalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatetraditionaliracalculatorResults(inputs);
  }

  validateInputs(inputs: traditionaliracalculatorInputs): boolean {
    const validation = validatetraditionaliracalculatorInputs(inputs);
    return validation.isValid;
  }
}
