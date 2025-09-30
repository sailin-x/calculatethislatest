import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ThyroidCalculator } from './ThyroidCalculator';

export function registerThyroidCalculator(): void {
  calculatorRegistry.register(ThyroidCalculator);
}

export { ThyroidCalculator };
