import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { HomeEquityCalculator } from './HomeEquityCalculator';

export function registerHomeEquityCalculator(): void {
  calculatorRegistry.register(HomeEquityCalculator);
}

export { HomeEquityCalculator };
