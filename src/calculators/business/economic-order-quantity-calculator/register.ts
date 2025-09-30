import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { EconomicOrderQuantityCalculator } from './EconomicOrderQuantityCalculator';

export function registerEconomicOrderQuantityCalculator(): void {
  calculatorRegistry.register(EconomicOrderQuantityCalculator);
}

export { EconomicOrderQuantityCalculator };
