import { Calculator } from '../../engines/CalculatorEngine';
import { restrictedstockunitrsuvsstockoptioncalculatorCalculatorInputs, restrictedstockunitrsuvsstockoptioncalculatorCalculatorOutputs } from './types';
import { calculaterestrictedstockunitrsuvsstockoptioncalculatorCalculatorResults } from './formulas';
import { validaterestrictedstockunitrsuvsstockoptioncalculatorCalculatorInputs } from './validation';

export class restrictedstockunitrsuvsstockoptioncalculatorCalculator implements Calculator<
  restrictedstockunitrsuvsstockoptioncalculatorCalculatorInputs,
  restrictedstockunitrsuvsstockoptioncalculatorCalculatorOutputs
> {
  readonly id = 'restricted_stock_unit_rsu_vs_stock_option_calculator_calculator';
  readonly name = 'restricted stock unit rsu vs stock option calculator Calculator';
  readonly description = 'Professional restricted stock unit rsu vs stock option calculator calculator with domain-specific functionality';

  calculate(inputs: restrictedstockunitrsuvsstockoptioncalculatorCalculatorInputs): restrictedstockunitrsuvsstockoptioncalculatorCalculatorOutputs {
    const validation = validaterestrictedstockunitrsuvsstockoptioncalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculaterestrictedstockunitrsuvsstockoptioncalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: restrictedstockunitrsuvsstockoptioncalculatorCalculatorInputs): boolean {
    const validation = validaterestrictedstockunitrsuvsstockoptioncalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
