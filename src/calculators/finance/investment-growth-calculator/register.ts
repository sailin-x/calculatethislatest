import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { InvestmentGrowthCalculator } from './InvestmentGrowthCalculator';

export function registerInvestmentGrowthCalculator(): void {
  calculatorRegistry.register(InvestmentGrowthCalculator);
}

export { InvestmentGrowthCalculator };
