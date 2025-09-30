import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CommoditiesFuturesProfitabilityCalculator } from './CommoditiesFuturesProfitabilityCalculator';

export function registerCommoditiesFuturesProfitabilityCalculator(): void {
  calculatorRegistry.register(CommoditiesFuturesProfitabilityCalculator);
}

export { CommoditiesFuturesProfitabilityCalculator };
