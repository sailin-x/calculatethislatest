import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerCarPaymentCalculatorCalculator } from './registerCarPaymentCalculatorCalculator';

export function registerregisterCarPaymentCalculatorCalculator(): void {
  calculatorRegistry.register(new registerCarPaymentCalculatorCalculator());
}
