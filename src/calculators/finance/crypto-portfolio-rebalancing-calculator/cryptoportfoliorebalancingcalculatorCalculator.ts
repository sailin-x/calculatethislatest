import { Calculator } from '../../engines/CalculatorEngine';
import { cryptoportfoliorebalancingcalculatorCalculatorInputs, cryptoportfoliorebalancingcalculatorCalculatorOutputs } from './types';
import { calculatecryptoportfoliorebalancingcalculatorCalculatorResults } from './formulas';
import { validatecryptoportfoliorebalancingcalculatorCalculatorInputs } from './validation';

export class cryptoportfoliorebalancingcalculatorCalculator implements Calculator<
  cryptoportfoliorebalancingcalculatorCalculatorInputs,
  cryptoportfoliorebalancingcalculatorCalculatorOutputs
> {
  readonly id = 'crypto_portfolio_rebalancing_calculator_calculator';
  readonly name = 'crypto portfolio rebalancing calculator Calculator';
  readonly description = 'Professional crypto portfolio rebalancing calculator calculator with domain-specific functionality';

  calculate(inputs: cryptoportfoliorebalancingcalculatorCalculatorInputs): cryptoportfoliorebalancingcalculatorCalculatorOutputs {
    const validation = validatecryptoportfoliorebalancingcalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatecryptoportfoliorebalancingcalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: cryptoportfoliorebalancingcalculatorCalculatorInputs): boolean {
    const validation = validatecryptoportfoliorebalancingcalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
