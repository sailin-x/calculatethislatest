import { calculatorRegistry } from '../../data/calculatorRegistry';
import { customer_acquisition_costCalculatorCalculator } from './customer_acquisition_costCalculatorCalculator';

export function registercustomer_acquisition_costCalculatorCalculator(): void {
  calculatorRegistry.register(new customer_acquisition_costCalculatorCalculator());
}
