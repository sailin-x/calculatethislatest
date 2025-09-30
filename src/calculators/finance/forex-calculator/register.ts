import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ForexCalculator } from './ForexCalculator';

export function registerForexCalculator(): void {
  calculatorRegistry.register(ForexCalculator);
}

export { ForexCalculator };
