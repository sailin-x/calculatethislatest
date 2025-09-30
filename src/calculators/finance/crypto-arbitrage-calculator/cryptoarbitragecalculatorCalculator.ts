import { Calculator } from '../../engines/CalculatorEngine';
import { cryptoarbitragecalculatorCalculatorInputs, cryptoarbitragecalculatorCalculatorOutputs } from './types';
import { calculatecryptoarbitragecalculatorCalculatorResults } from './formulas';
import { validatecryptoarbitragecalculatorCalculatorInputs } from './validation';

export class cryptoarbitragecalculatorCalculator implements Calculator<
  cryptoarbitragecalculatorCalculatorInputs,
  cryptoarbitragecalculatorCalculatorOutputs
> {
  readonly id = 'crypto_arbitrage_calculator_calculator';
  readonly name = 'crypto arbitrage calculator Calculator';
  readonly description = 'Professional crypto arbitrage calculator calculator with domain-specific functionality';

  calculate(inputs: cryptoarbitragecalculatorCalculatorInputs): cryptoarbitragecalculatorCalculatorOutputs {
    const validation = validatecryptoarbitragecalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatecryptoarbitragecalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: cryptoarbitragecalculatorCalculatorInputs): boolean {
    const validation = validatecryptoarbitragecalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
