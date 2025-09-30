import { calculatorRegistry } from '../../data/calculatorRegistry';
import { stock_options_calculator_exists_but_needs_registrationCalculatorCalculator } from './stock_options_calculator_exists_but_needs_registrationCalculatorCalculator';

export function registerstock_options_calculator_exists_but_needs_registrationCalculatorCalculator(): void {
  calculatorRegistry.register(new stock_options_calculator_exists_but_needs_registrationCalculatorCalculator());
}
