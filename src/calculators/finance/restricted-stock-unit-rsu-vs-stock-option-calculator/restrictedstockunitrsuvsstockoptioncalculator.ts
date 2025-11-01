import { Calculator } from '../../engines/CalculatorEngine';
import { restrictedstockunitrsuvsstockoptioncalculatorInputs, restrictedstockunitrsuvsstockoptioncalculatorOutputs } from './types';
import { calculaterestrictedstockunitrsuvsstockoptioncalculatorResults } from './formulas';
import { validaterestrictedstockunitrsuvsstockoptioncalculatorInputs } from './validation';

export class restrictedstockunitrsuvsstockoptioncalculator implements Calculator<
  restrictedstockunitrsuvsstockoptioncalculatorInputs,
  restrictedstockunitrsuvsstockoptioncalculatorOutputs
> {
  readonly id = 'restricted_stock_unit_rsu_vs_stock_option_calculator_calculator';
  readonly name = 'restricted stock unit rsu vs stock option calculator Calculator';
  readonly description = 'Professional restricted stock unit rsu vs stock option calculator calculator with domain-specific functionality';

  calculate(inputs: restrictedstockunitrsuvsstockoptioncalculatorInputs): restrictedstockunitrsuvsstockoptioncalculatorOutputs {
    const validation = validaterestrictedstockunitrsuvsstockoptioncalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculaterestrictedstockunitrsuvsstockoptioncalculatorResults(inputs);
  }

  validateInputs(inputs: restrictedstockunitrsuvsstockoptioncalculatorInputs): boolean {
    const validation = validaterestrictedstockunitrsuvsstockoptioncalculatorInputs(inputs);
    return validation.isValid;
  }
}
