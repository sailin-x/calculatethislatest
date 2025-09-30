import { calculatorRegistry } from '../../data/calculatorRegistry';
import { rentalYieldCalculatorCalculator } from './rentalYieldCalculatorCalculator';

export function registerrentalYieldCalculatorCalculator(): void {
  calculatorRegistry.register(new rentalYieldCalculatorCalculator());
}
