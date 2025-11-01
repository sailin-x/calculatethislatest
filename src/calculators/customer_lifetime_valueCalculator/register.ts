import { calculatorRegistry } from '../../data/calculatorRegistry';
import { customer_lifetime_valueCalculator } from './customer_lifetime_valueCalculator';

export function registercustomer_lifetime_valueCalculator(): void {
  calculatorRegistry.register(new customer_lifetime_valueCalculator());
}
