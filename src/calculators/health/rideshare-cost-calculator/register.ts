import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { RideshareCostCalculator } from './RideshareCostCalculator';

export function registerRideshareCostCalculator(): void {
  calculatorRegistry.register(RideshareCostCalculator);
}

export { RideshareCostCalculator };
