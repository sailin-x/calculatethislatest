import { calculatorRegistry } from '../../data/calculatorRegistry';
import { ground_lease_valuationCalculator } from './ground_lease_valuationCalculator';

export function registerground_lease_valuationCalculator(): void {
  calculatorRegistry.register(new ground_lease_valuationCalculator());
}
