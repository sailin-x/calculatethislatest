import { calculatorRegistry } from '../../data/calculatorRegistry';
import { rv_rental_cost_calculatorCalculatorCalculator } from './rv_rental_cost_calculatorCalculatorCalculator';

export function registerrv_rental_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new rv_rental_cost_calculatorCalculatorCalculator());
}
