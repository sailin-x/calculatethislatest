import { calculatorRegistry } from '../../data/calculatorRegistry';
import { stock_options_calculator_exists_but_needs_registrationCalculator } from './stock_options_calculator_exists_but_needs_registrationCalculator';

export function registerstock_options_calculator_exists_but_needs_registrationCalculator(): void {
  calculatorRegistry.register(new stock_options_calculator_exists_but_needs_registrationCalculator());
}
