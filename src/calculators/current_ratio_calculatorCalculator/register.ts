import { calculatorRegistry } from '../../data/calculatorRegistry';
import { current_ratio_calculatorCalculatorCalculator } from './current_ratio_calculatorCalculatorCalculator';

export function registercurrent_ratio_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new current_ratio_calculatorCalculatorCalculator());
}
