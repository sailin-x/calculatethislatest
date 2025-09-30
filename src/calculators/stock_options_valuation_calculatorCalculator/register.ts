import { calculatorRegistry } from '../../data/calculatorRegistry';
import { stock_options_valuation_calculatorCalculatorCalculator } from './stock_options_valuation_calculatorCalculatorCalculator';

export function registerstock_options_valuation_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new stock_options_valuation_calculatorCalculatorCalculator());
}
