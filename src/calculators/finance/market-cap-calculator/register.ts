import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MarketCapCalculator } from './MarketCapCalculator';

export function registerMarketCapCalculator(): void {
  calculatorRegistry.register(MarketCapCalculator);
}

export { MarketCapCalculator };
