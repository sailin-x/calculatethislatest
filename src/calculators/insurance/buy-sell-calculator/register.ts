import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BuySellCalculator } from './BuySellCalculator';

export function registerBuySellCalculator(): void {
  calculatorRegistry.register(BuySellCalculator);
}

export { BuySellCalculator };
