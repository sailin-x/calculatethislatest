import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRentalYieldCalculatorCalculator } from './registerRentalYieldCalculatorCalculator';

export function registerregisterRentalYieldCalculatorCalculator(): void {
  calculatorRegistry.register(new registerRentalYieldCalculatorCalculator());
}
