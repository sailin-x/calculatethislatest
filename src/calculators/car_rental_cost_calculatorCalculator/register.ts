import { calculatorRegistry } from '../../data/calculatorRegistry';
import { car_rental_cost_calculatorCalculatorCalculator } from './car_rental_cost_calculatorCalculatorCalculator';

export function registercar_rental_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new car_rental_cost_calculatorCalculatorCalculator());
}
