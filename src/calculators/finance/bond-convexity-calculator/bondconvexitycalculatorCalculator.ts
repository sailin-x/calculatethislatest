import { Calculator } from '../../engines/CalculatorEngine';
import { bondconvexitycalculatorCalculatorInputs, bondconvexitycalculatorCalculatorOutputs } from './types';
import { calculatebondconvexitycalculatorCalculatorResults } from './formulas';
import { validatebondconvexitycalculatorCalculatorInputs } from './validation';

export class bondconvexitycalculatorCalculator implements Calculator<
  bondconvexitycalculatorCalculatorInputs,
  bondconvexitycalculatorCalculatorOutputs
> {
  readonly id = 'bond_convexity_calculator_calculator';
  readonly name = 'bond convexity calculator Calculator';
  readonly description = 'Professional bond convexity calculator calculator with domain-specific functionality';

  calculate(inputs: bondconvexitycalculatorCalculatorInputs): bondconvexitycalculatorCalculatorOutputs {
    const validation = validatebondconvexitycalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatebondconvexitycalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: bondconvexitycalculatorCalculatorInputs): boolean {
    const validation = validatebondconvexitycalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
