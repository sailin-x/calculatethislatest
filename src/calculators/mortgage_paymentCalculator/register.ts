import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_paymentCalculator } from './mortgage_paymentCalculator';

export function registermortgage_paymentCalculator(): void {
  calculatorRegistry.register(new mortgage_paymentCalculator());
}
