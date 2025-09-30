import { calculatorRegistry } from '../../data/calculatorRegistry';
import { price_per_square_footCalculatorCalculator } from './price_per_square_footCalculatorCalculator';

export function registerprice_per_square_footCalculatorCalculator(): void {
  calculatorRegistry.register(new price_per_square_footCalculatorCalculator());
}
