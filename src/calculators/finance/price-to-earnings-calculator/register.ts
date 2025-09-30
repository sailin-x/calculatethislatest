import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PriceToEarningsCalculator } from './PriceToEarningsCalculator';

export function registerPriceToEarningsCalculator(): void {
  calculatorRegistry.register(PriceToEarningsCalculator);
}

export { PriceToEarningsCalculator };
