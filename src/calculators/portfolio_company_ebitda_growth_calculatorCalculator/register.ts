import { calculatorRegistry } from '../../data/calculatorRegistry';
import { portfolio_company_ebitda_growth_calculatorCalculatorCalculator } from './portfolio_company_ebitda_growth_calculatorCalculatorCalculator';

export function registerportfolio_company_ebitda_growth_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new portfolio_company_ebitda_growth_calculatorCalculatorCalculator());
}
