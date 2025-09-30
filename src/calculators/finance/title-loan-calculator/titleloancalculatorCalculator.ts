import { Calculator } from '../../engines/CalculatorEngine';
import { titleloancalculatorCalculatorInputs, titleloancalculatorCalculatorOutputs } from './types';
import { calculatetitleloancalculatorCalculatorResults } from './formulas';
import { validatetitleloancalculatorCalculatorInputs } from './validation';

export class titleloancalculatorCalculator implements Calculator<
  titleloancalculatorCalculatorInputs,
  titleloancalculatorCalculatorOutputs
> {
  readonly id = 'title_loan_calculator_calculator';
  readonly name = 'title loan calculator Calculator';
  readonly description = 'Professional title loan calculator calculator with domain-specific functionality';

  calculate(inputs: titleloancalculatorCalculatorInputs): titleloancalculatorCalculatorOutputs {
    const validation = validatetitleloancalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatetitleloancalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: titleloancalculatorCalculatorInputs): boolean {
    const validation = validatetitleloancalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
