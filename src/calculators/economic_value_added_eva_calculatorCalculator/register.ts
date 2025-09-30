import { calculatorRegistry } from '../../data/calculatorRegistry';
import { economic_value_added_eva_calculatorCalculatorCalculator } from './economic_value_added_eva_calculatorCalculatorCalculator';

export function registereconomic_value_added_eva_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new economic_value_added_eva_calculatorCalculatorCalculator());
}
