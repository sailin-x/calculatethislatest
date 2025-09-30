import { calculatorRegistry } from '../../data/calculatorRegistry';
import { economic_order_quantity_calculatorCalculatorCalculator } from './economic_order_quantity_calculatorCalculatorCalculator';

export function registereconomic_order_quantity_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new economic_order_quantity_calculatorCalculatorCalculator());
}
