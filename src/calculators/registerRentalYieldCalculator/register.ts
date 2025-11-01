import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRentalYieldCalculator } from './registerRentalYieldCalculator';

export function registerregisterRentalYieldCalculator(): void {
  calculatorRegistry.register(new registerRentalYieldCalculator());
}
