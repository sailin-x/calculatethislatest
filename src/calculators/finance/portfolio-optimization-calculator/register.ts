import { calculatorRegistry } from '../../data/calculatorRegistry';
import { portfoliooptimizationcalculatorCalculator } from './portfoliooptimizationcalculatorCalculator';

export function registerportfoliooptimizationcalculatorCalculator(): void {
  calculatorRegistry.register(new portfoliooptimizationcalculatorCalculator());
}
