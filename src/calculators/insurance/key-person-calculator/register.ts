import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { KeyPersonCalculator } from './KeyPersonCalculator';

export function registerKeyPersonCalculator(): void {
  calculatorRegistry.register(KeyPersonCalculator);
}

export { KeyPersonCalculator };
