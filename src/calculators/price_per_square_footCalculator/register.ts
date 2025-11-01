import { calculatorRegistry } from '../../data/calculatorRegistry';
import { price_per_square_footCalculator } from './price_per_square_footCalculator';

export function registerprice_per_square_footCalculator(): void {
  calculatorRegistry.register(new price_per_square_footCalculator());
}
