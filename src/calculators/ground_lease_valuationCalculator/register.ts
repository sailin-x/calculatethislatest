import { calculatorRegistry } from '../../data/calculatorRegistry';
import { ground_lease_valuationCalculatorCalculator } from './ground_lease_valuationCalculatorCalculator';

export function registerground_lease_valuationCalculatorCalculator(): void {
  calculatorRegistry.register(new ground_lease_valuationCalculatorCalculator());
}
