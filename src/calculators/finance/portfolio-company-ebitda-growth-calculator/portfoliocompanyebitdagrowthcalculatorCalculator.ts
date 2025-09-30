import { Calculator } from '../../engines/CalculatorEngine';
import { portfoliocompanyebitdagrowthcalculatorCalculatorInputs, portfoliocompanyebitdagrowthcalculatorCalculatorOutputs } from './types';
import { calculateportfoliocompanyebitdagrowthcalculatorCalculatorResults } from './formulas';
import { validateportfoliocompanyebitdagrowthcalculatorCalculatorInputs } from './validation';

export class portfoliocompanyebitdagrowthcalculatorCalculator implements Calculator<
  portfoliocompanyebitdagrowthcalculatorCalculatorInputs,
  portfoliocompanyebitdagrowthcalculatorCalculatorOutputs
> {
  readonly id = 'portfolio_company_ebitda_growth_calculator_calculator';
  readonly name = 'portfolio company ebitda growth calculator Calculator';
  readonly description = 'Professional portfolio company ebitda growth calculator calculator with domain-specific functionality';

  calculate(inputs: portfoliocompanyebitdagrowthcalculatorCalculatorInputs): portfoliocompanyebitdagrowthcalculatorCalculatorOutputs {
    const validation = validateportfoliocompanyebitdagrowthcalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculateportfoliocompanyebitdagrowthcalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: portfoliocompanyebitdagrowthcalculatorCalculatorInputs): boolean {
    const validation = validateportfoliocompanyebitdagrowthcalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
