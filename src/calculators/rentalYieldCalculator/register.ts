import { calculatorRegistry } from '../../data/calculatorRegistry';
import { rentalYieldCalculator } from './rentalYieldCalculator';

export function registerrentalYieldCalculator(): void {
  calculatorRegistry.register(new rentalYieldCalculator());
}
