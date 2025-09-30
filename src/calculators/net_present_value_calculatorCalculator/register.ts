import { calculatorRegistry } from '../../data/calculatorRegistry';
import { net_present_value_calculatorCalculatorCalculator } from './net_present_value_calculatorCalculatorCalculator';

export function registernet_present_value_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new net_present_value_calculatorCalculatorCalculator());
}
