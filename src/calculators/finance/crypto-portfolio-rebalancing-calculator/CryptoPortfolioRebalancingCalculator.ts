import { Calculator } from '../../engines/CalculatorEngine';
import { cryptoportfoliorebalancingcalculatorInputs, cryptoportfoliorebalancingcalculatorOutputs } from './types';
import { calculatecryptoportfoliorebalancingcalculatorResults } from './formulas';
import { validatecryptoportfoliorebalancingcalculatorInputs } from './validation';

export class cryptoportfoliorebalancingcalculator implements Calculator<
  cryptoportfoliorebalancingcalculatorInputs,
  cryptoportfoliorebalancingcalculatorOutputs
> {
  readonly id = 'crypto_portfolio_rebalancing_calculator_calculator';
  readonly name = 'crypto portfolio rebalancing calculator Calculator';
  readonly description = 'Professional crypto portfolio rebalancing calculator calculator with domain-specific functionality';

  calculate(inputs: cryptoportfoliorebalancingcalculatorInputs): cryptoportfoliorebalancingcalculatorOutputs {
    const validation = validatecryptoportfoliorebalancingcalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatecryptoportfoliorebalancingcalculatorResults(inputs);
  }

  validateInputs(inputs: cryptoportfoliorebalancingcalculatorInputs): boolean {
    const validation = validatecryptoportfoliorebalancingcalculatorInputs(inputs);
    return validation.isValid;
  }
}
