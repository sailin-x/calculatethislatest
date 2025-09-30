import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CarPaymentCalculatorCalculator } from './CarPaymentCalculatorCalculator';

export function registerCarPaymentCalculatorCalculator(): void {
  calculatorRegistry.register(new CarPaymentCalculatorCalculator());
}
