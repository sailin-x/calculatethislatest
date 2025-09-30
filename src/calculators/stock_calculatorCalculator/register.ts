import { calculatorRegistry } from '../../data/calculatorRegistry';
import { stock_calculatorCalculatorCalculator } from './stock_calculatorCalculatorCalculator';

export function registerstock_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new stock_calculatorCalculatorCalculator());
}
