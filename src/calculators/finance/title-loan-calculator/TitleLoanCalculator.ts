import { Calculator } from '../../engines/CalculatorEngine';
import { titleloancalculatorInputs, titleloancalculatorOutputs } from './types';
import { calculatetitleloancalculatorResults } from './formulas';
import { validatetitleloancalculatorInputs } from './validation';

export class titleloancalculator implements Calculator<
  titleloancalculatorInputs,
  titleloancalculatorOutputs
> {
  readonly id = 'title_loan_calculator_calculator';
  readonly name = 'title loan calculator Calculator';
  readonly description = 'Professional title loan calculator calculator with domain-specific functionality';

  calculate(inputs: titleloancalculatorInputs): titleloancalculatorOutputs {
    const validation = validatetitleloancalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatetitleloancalculatorResults(inputs);
  }

  validateInputs(inputs: titleloancalculatorInputs): boolean {
    const validation = validatetitleloancalculatorInputs(inputs);
    return validation.isValid;
  }
}
