import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { RvRentalCostCalculator } from './RvRentalCostCalculator';

export function registerRvRentalCostCalculator(): void {
  calculatorRegistry.register(RvRentalCostCalculator);
}

export { RvRentalCostCalculator };
