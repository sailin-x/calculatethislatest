import { Calculator } from '../../engines/CalculatorEngine';
import { cryptominingprofitabilitycalculatorInputs, cryptominingprofitabilitycalculatorOutputs } from './types';
import { calculatecryptominingprofitabilitycalculatorResults } from './formulas';
import { validatecryptominingprofitabilitycalculatorInputs } from './validation';

export class cryptominingprofitabilitycalculator implements Calculator<
  cryptominingprofitabilitycalculatorInputs,
  cryptominingprofitabilitycalculatorOutputs
> {
  readonly id = 'crypto_mining_profitability_calculator_calculator';
  readonly name = 'crypto mining profitability calculator Calculator';
  readonly description = 'Professional crypto mining profitability calculator calculator with domain-specific functionality';

  calculate(inputs: cryptominingprofitabilitycalculatorInputs): cryptominingprofitabilitycalculatorOutputs {
    const validation = validatecryptominingprofitabilitycalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatecryptominingprofitabilitycalculatorResults(inputs);
  }

  validateInputs(inputs: cryptominingprofitabilitycalculatorInputs): boolean {
    const validation = validatecryptominingprofitabilitycalculatorInputs(inputs);
    return validation.isValid;
  }
}
