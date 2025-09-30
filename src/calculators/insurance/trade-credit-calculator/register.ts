import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TradeCreditCalculator } from './TradeCreditCalculator';

export function registerTradeCreditCalculator(): void {
  calculatorRegistry.register(TradeCreditCalculator);
}

export { TradeCreditCalculator };
