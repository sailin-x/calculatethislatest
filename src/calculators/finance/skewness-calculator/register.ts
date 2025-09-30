import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SkewnessCalculator } from './SkewnessCalculator';

export function registerSkewnessCalculator(): void {
  calculatorRegistry.register(SkewnessCalculator);
}

export { SkewnessCalculator };
