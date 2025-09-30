import { calculatorRegistry } from '../../data/calculatorRegistry';
import { commercial_real_estate_cash_flowCalculatorCalculator } from './commercial_real_estate_cash_flowCalculatorCalculator';

export function registercommercial_real_estate_cash_flowCalculatorCalculator(): void {
  calculatorRegistry.register(new commercial_real_estate_cash_flowCalculatorCalculator());
}
