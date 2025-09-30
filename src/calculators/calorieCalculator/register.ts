import { calculatorRegistry } from '../../data/calculatorRegistry';
import { calorieCalculatorCalculator } from './calorieCalculatorCalculator';

export function registercalorieCalculatorCalculator(): void {
  calculatorRegistry.register(new calorieCalculatorCalculator());
}
