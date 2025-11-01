import { Calculator } from '../../engines/CalculatorEngine';
import { portfoliooptimizationcalculatorInputs, portfoliooptimizationcalculatorOutputs } from './types';
import { calculateportfoliooptimizationcalculatorResults } from './formulas';
import { validateportfoliooptimizationcalculatorInputs } from './validation';

export class portfoliooptimizationcalculator implements Calculator<
  portfoliooptimizationcalculatorInputs,
  portfoliooptimizationcalculatorOutputs
> {
  readonly id = 'portfolio_optimization_calculator_calculator';
  readonly name = 'portfolio optimization calculator Calculator';
  readonly description = 'Professional portfolio optimization calculator calculator with domain-specific functionality';

  calculate(inputs: portfoliooptimizationcalculatorInputs): portfoliooptimizationcalculatorOutputs {
    const validation = validateportfoliooptimizationcalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculateportfoliooptimizationcalculatorResults(inputs);
  }

  validateInputs(inputs: portfoliooptimizationcalculatorInputs): boolean {
    const validation = validateportfoliooptimizationcalculatorInputs(inputs);
    return validation.isValid;
  }
}
