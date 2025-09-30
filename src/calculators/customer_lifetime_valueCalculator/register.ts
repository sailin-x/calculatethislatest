import { calculatorRegistry } from '../../data/calculatorRegistry';
import { customer_lifetime_valueCalculatorCalculator } from './customer_lifetime_valueCalculatorCalculator';

export function registercustomer_lifetime_valueCalculatorCalculator(): void {
  calculatorRegistry.register(new customer_lifetime_valueCalculatorCalculator());
}
