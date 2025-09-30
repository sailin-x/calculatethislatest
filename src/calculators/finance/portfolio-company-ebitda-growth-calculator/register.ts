import { calculatorRegistry } from '../../data/calculatorRegistry';
import { portfoliocompanyebitdagrowthcalculatorCalculator } from './portfoliocompanyebitdagrowthcalculatorCalculator';

export function registerportfoliocompanyebitdagrowthcalculatorCalculator(): void {
  calculatorRegistry.register(new portfoliocompanyebitdagrowthcalculatorCalculator());
}
