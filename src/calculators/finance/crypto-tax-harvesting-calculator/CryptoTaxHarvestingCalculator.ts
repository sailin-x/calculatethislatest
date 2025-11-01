import { Calculator } from '../../engines/CalculatorEngine';
import { cryptotaxharvestingcalculatorInputs, cryptotaxharvestingcalculatorOutputs } from './types';
import { calculatecryptotaxharvestingcalculatorResults } from './formulas';
import { validatecryptotaxharvestingcalculatorInputs } from './validation';

export class cryptotaxharvestingcalculator implements Calculator<
  cryptotaxharvestingcalculatorInputs,
  cryptotaxharvestingcalculatorOutputs
> {
  readonly id = 'crypto_tax_harvesting_calculator_calculator';
  readonly name = 'crypto tax harvesting calculator Calculator';
  readonly description = 'Professional crypto tax harvesting calculator calculator with domain-specific functionality';

  calculate(inputs: cryptotaxharvestingcalculatorInputs): cryptotaxharvestingcalculatorOutputs {
    const validation = validatecryptotaxharvestingcalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatecryptotaxharvestingcalculatorResults(inputs);
  }

  validateInputs(inputs: cryptotaxharvestingcalculatorInputs): boolean {
    const validation = validatecryptotaxharvestingcalculatorInputs(inputs);
    return validation.isValid;
  }
}

export const CryptoTaxHarvestingCalculator = cryptotaxharvestingcalculator;
