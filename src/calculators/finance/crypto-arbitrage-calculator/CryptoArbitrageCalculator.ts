import { Calculator } from '../../engines/CalculatorEngine';
import { cryptoarbitragecalculatorInputs, cryptoarbitragecalculatorOutputs } from './types';
import { calculatecryptoarbitragecalculatorResults } from './formulas';
import { validatecryptoarbitragecalculatorInputs } from './validation';

export class cryptoarbitragecalculator implements Calculator<
  cryptoarbitragecalculatorInputs,
  cryptoarbitragecalculatorOutputs
> {
  readonly id = 'crypto_arbitrage_calculator_calculator';
  readonly name = 'crypto arbitrage calculator Calculator';
  readonly description = 'Professional crypto arbitrage calculator calculator with domain-specific functionality';

  calculate(inputs: cryptoarbitragecalculatorInputs): cryptoarbitragecalculatorOutputs {
    const validation = validatecryptoarbitragecalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatecryptoarbitragecalculatorResults(inputs);
  }

  validateInputs(inputs: cryptoarbitragecalculatorInputs): boolean {
    const validation = validatecryptoarbitragecalculatorInputs(inputs);
    return validation.isValid;
  }
}
