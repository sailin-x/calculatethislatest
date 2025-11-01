import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CarPaymentCalculator } from './CarPaymentCalculator';

export function registerCarPaymentCalculator(): void {
  calculatorRegistry.register(new CarPaymentCalculator());
}
