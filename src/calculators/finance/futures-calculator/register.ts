import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FuturesCalculator } from './FuturesCalculator';

export function registerFuturesCalculator(): void {
  calculatorRegistry.register(FuturesCalculator);
}

export { FuturesCalculator };
