import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MarketingRoiCalculator } from './MarketingRoiCalculator';

export function registerMarketingRoiCalculator(): void {
  calculatorRegistry.register(MarketingRoiCalculator);
}

export { MarketingRoiCalculator };
