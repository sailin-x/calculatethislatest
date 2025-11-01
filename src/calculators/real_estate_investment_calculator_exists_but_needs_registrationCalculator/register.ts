import { calculatorRegistry } from '../../data/calculatorRegistry';
import { real_estate_investment_calculator_exists_but_needs_registrationCalculator } from './real_estate_investment_calculator_exists_but_needs_registrationCalculator';

export function registerreal_estate_investment_calculator_exists_but_needs_registrationCalculator(): void {
  calculatorRegistry.register(new real_estate_investment_calculator_exists_but_needs_registrationCalculator());
}
