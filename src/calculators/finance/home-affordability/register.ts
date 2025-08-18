import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { HomeAffordabilityCalculator } from './HomeAffordabilityCalculator';

export function registerHomeAffordabilityCalculator(registry: CalculatorRegistry): void {
  registry.register(HomeAffordabilityCalculator);
}

export { HomeAffordabilityCalculator };
