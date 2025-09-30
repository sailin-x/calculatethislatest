import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PriceToBookCalculator } from './PriceToBookCalculator';

export function registerPriceToBookCalculator(): void {
  calculatorRegistry.register(PriceToBookCalculator);
}

export { PriceToBookCalculator };
