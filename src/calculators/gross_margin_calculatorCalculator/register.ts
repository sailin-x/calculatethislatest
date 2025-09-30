import { calculatorRegistry } from '../../data/calculatorRegistry';
import { gross_margin_calculatorCalculatorCalculator } from './gross_margin_calculatorCalculatorCalculator';

export function registergross_margin_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new gross_margin_calculatorCalculatorCalculator());
}
