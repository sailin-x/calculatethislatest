import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FuturesTradingProfitabilityCalculator } from './FuturesTradingProfitabilityCalculator';

export function registerFuturesTradingProfitabilityCalculator(): void {
  calculatorRegistry.register(FuturesTradingProfitabilityCalculator);
}

export { FuturesTradingProfitabilityCalculator };
