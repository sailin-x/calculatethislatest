import { calculatorRegistry } from '../../data/calculatorRegistry';
import { food_cost_calculatorCalculatorCalculator } from './food_cost_calculatorCalculatorCalculator';

export function registerfood_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new food_cost_calculatorCalculatorCalculator());
}
