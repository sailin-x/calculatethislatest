import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { LiquidationPriceCalculator } from './LiquidationPriceCalculator';

export function registerLiquidationPriceCalculator(): void {
  calculatorRegistry.register(LiquidationPriceCalculator);
}

export { LiquidationPriceCalculator };
