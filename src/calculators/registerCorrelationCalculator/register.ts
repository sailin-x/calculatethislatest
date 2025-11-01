import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerCorrelationCalculator } from './registerCorrelationCalculator';

export function registerregisterCorrelationCalculator(): void {
  calculatorRegistry.register(new registerCorrelationCalculator());
}
