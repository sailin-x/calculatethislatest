import { calculatorRegistry } from '../../data/calculatorRegistry';
import { average_order_value_calculatorCalculator } from './average_order_value_calculatorCalculator';

export function registeraverage_order_value_calculatorCalculator(): void {
  calculatorRegistry.register(new average_order_value_calculatorCalculator());
}
