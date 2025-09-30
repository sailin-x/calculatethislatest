import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PercentageCalculator } from './PercentageCalculator';

export function registerPercentageCalculator(): void {
  calculatorRegistry.register(PercentageCalculator);
}

export { PercentageCalculator };
