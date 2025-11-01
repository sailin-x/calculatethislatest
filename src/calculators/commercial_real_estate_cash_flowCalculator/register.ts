import { calculatorRegistry } from '../../data/calculatorRegistry';
import { commercial_real_estate_cash_flowCalculator } from './commercial_real_estate_cash_flowCalculator';

export function registercommercial_real_estate_cash_flowCalculator(): void {
  calculatorRegistry.register(new commercial_real_estate_cash_flowCalculator());
}
