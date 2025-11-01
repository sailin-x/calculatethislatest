import { calculatorRegistry } from '../../data/calculatorRegistry';
import { customer_acquisition_costCalculator } from './customer_acquisition_costCalculator';

export function registercustomer_acquisition_costCalculator(): void {
  calculatorRegistry.register(new customer_acquisition_costCalculator());
}
