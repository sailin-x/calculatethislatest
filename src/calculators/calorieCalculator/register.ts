import { calculatorRegistry } from '../../data/calculatorRegistry';
import { calorieCalculator } from './calorieCalculator';

export function registercalorieCalculator(): void {
  calculatorRegistry.register(new calorieCalculator());
}
