import { Calculator } from '../../engines/CalculatorEngine';
import { cryptotaxharvestingcalculatorCalculatorInputs, cryptotaxharvestingcalculatorCalculatorOutputs } from './types';
import { calculatecryptotaxharvestingcalculatorCalculatorResults } from './formulas';
import { validatecryptotaxharvestingcalculatorCalculatorInputs } from './validation';

export class cryptotaxharvestingcalculatorCalculator implements Calculator<
  cryptotaxharvestingcalculatorCalculatorInputs,
  cryptotaxharvestingcalculatorCalculatorOutputs
> {
  readonly id = 'crypto_tax_harvesting_calculator_calculator';
  readonly name = 'crypto tax harvesting calculator Calculator';
  readonly description = 'Professional crypto tax harvesting calculator calculator with domain-specific functionality';

  calculate(inputs: cryptotaxharvestingcalculatorCalculatorInputs): cryptotaxharvestingcalculatorCalculatorOutputs {
    const validation = validatecryptotaxharvestingcalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatecryptotaxharvestingcalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: cryptotaxharvestingcalculatorCalculatorInputs): boolean {
    const validation = validatecryptotaxharvestingcalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
