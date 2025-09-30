import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BitcoinPizzaDayCalculator } from './BitcoinPizzaDayCalculator';

export function registerBitcoinPizzaDayCalculator(): void {
  calculatorRegistry.register(BitcoinPizzaDayCalculator);
}

export { BitcoinPizzaDayCalculator };
