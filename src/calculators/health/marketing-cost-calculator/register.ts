import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MarketingCostCalculator } from './MarketingCostCalculator';

export function registerMarketingCostCalculator(): void {
  calculatorRegistry.register(MarketingCostCalculator);
}

export { MarketingCostCalculator };
