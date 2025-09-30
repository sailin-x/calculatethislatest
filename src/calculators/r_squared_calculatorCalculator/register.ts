import { calculatorRegistry } from '../../data/calculatorRegistry';
import { r_squared_calculatorCalculatorCalculator } from './r_squared_calculatorCalculatorCalculator';

export function registerr_squared_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new r_squared_calculatorCalculatorCalculator());
}
