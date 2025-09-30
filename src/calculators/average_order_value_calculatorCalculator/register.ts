import { calculatorRegistry } from '../../data/calculatorRegistry';
import { average_order_value_calculatorCalculatorCalculator } from './average_order_value_calculatorCalculatorCalculator';

export function registeraverage_order_value_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new average_order_value_calculatorCalculatorCalculator());
}
