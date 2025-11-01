import { Calculator } from '../../engines/CalculatorEngine';
import { bondconvexitycalculatorInputs, bondconvexitycalculatorOutputs } from './types';
import { calculatebondconvexitycalculatorResults } from './formulas';
import { validatebondconvexitycalculatorInputs } from './validation';

export class bondconvexitycalculator implements Calculator<
  bondconvexitycalculatorInputs,
  bondconvexitycalculatorOutputs
> {
  readonly id = 'bond_convexity_calculator_calculator';
  readonly name = 'bond convexity calculator Calculator';
  readonly description = 'Professional bond convexity calculator calculator with domain-specific functionality';

  calculate(inputs: bondconvexitycalculatorInputs): bondconvexitycalculatorOutputs {
    const validation = validatebondconvexitycalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatebondconvexitycalculatorResults(inputs);
  }

  validateInputs(inputs: bondconvexitycalculatorInputs): boolean {
    const validation = validatebondconvexitycalculatorInputs(inputs);
    return validation.isValid;
  }
}
