import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_paymentCalculatorCalculator } from './mortgage_paymentCalculatorCalculator';

export function registermortgage_paymentCalculatorCalculator(): void {
  calculatorRegistry.register(new mortgage_paymentCalculatorCalculator());
}
