import { Calculator } from '../../engines/CalculatorEngine';
import { portfoliocompanyebitdagrowthcalculatorInputs, portfoliocompanyebitdagrowthcalculatorOutputs } from './types';
import { calculateportfoliocompanyebitdagrowthcalculatorResults } from './formulas';
import { validateportfoliocompanyebitdagrowthcalculatorInputs } from './validation';

export class portfoliocompanyebitdagrowthcalculator implements Calculator<
  portfoliocompanyebitdagrowthcalculatorInputs,
  portfoliocompanyebitdagrowthcalculatorOutputs
> {
  readonly id = 'portfolio_company_ebitda_growth_calculator_calculator';
  readonly name = 'portfolio company ebitda growth calculator Calculator';
  readonly description = 'Professional portfolio company ebitda growth calculator calculator with domain-specific functionality';

  calculate(inputs: portfoliocompanyebitdagrowthcalculatorInputs): portfoliocompanyebitdagrowthcalculatorOutputs {
    const validation = validateportfoliocompanyebitdagrowthcalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculateportfoliocompanyebitdagrowthcalculatorResults(inputs);
  }

  validateInputs(inputs: portfoliocompanyebitdagrowthcalculatorInputs): boolean {
    const validation = validateportfoliocompanyebitdagrowthcalculatorInputs(inputs);
    return validation.isValid;
  }
}
