import { Calculator } from '../../engines/CalculatorEngine';
import { cryptominingprofitabilitycalculatorCalculatorInputs, cryptominingprofitabilitycalculatorCalculatorOutputs } from './types';
import { calculatecryptominingprofitabilitycalculatorCalculatorResults } from './formulas';
import { validatecryptominingprofitabilitycalculatorCalculatorInputs } from './validation';

export class cryptominingprofitabilitycalculatorCalculator implements Calculator<
  cryptominingprofitabilitycalculatorCalculatorInputs,
  cryptominingprofitabilitycalculatorCalculatorOutputs
> {
  readonly id = 'crypto_mining_profitability_calculator_calculator';
  readonly name = 'crypto mining profitability calculator Calculator';
  readonly description = 'Professional crypto mining profitability calculator calculator with domain-specific functionality';

  calculate(inputs: cryptominingprofitabilitycalculatorCalculatorInputs): cryptominingprofitabilitycalculatorCalculatorOutputs {
    const validation = validatecryptominingprofitabilitycalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatecryptominingprofitabilitycalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: cryptominingprofitabilitycalculatorCalculatorInputs): boolean {
    const validation = validatecryptominingprofitabilitycalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
