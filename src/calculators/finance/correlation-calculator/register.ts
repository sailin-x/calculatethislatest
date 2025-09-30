import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CorrelationCalculator } from './CorrelationCalculator';

export function registerCorrelationCalculator(): void {
  calculatorRegistry.register(CorrelationCalculator);
}

export { CorrelationCalculator };
