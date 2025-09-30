import { calculatorRegistry } from '../../data/calculatorRegistry';
import { hotel_cost_calculatorCalculatorCalculator } from './hotel_cost_calculatorCalculatorCalculator';

export function registerhotel_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new hotel_cost_calculatorCalculatorCalculator());
}
