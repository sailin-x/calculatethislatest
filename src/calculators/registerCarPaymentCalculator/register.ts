import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerCarPaymentCalculator } from './registerCarPaymentCalculator';

export function registerregisterCarPaymentCalculator(): void {
  calculatorRegistry.register(new registerCarPaymentCalculator());
}
