import { calculatorRegistry } from '../../data/calculatorRegistry';
import { restricted_stock_unit_vs_stock_option_calculatorCalculatorCalculator } from './restricted_stock_unit_vs_stock_option_calculatorCalculatorCalculator';

export function registerrestricted_stock_unit_vs_stock_option_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new restricted_stock_unit_vs_stock_option_calculatorCalculatorCalculator());
}
