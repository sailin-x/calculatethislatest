import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { LawnCareCostCalculator } from './LawnCareCostCalculator';

export function registerLawnCareCostCalculator(): void {
  calculatorRegistry.register(LawnCareCostCalculator);
}

export { LawnCareCostCalculator };
