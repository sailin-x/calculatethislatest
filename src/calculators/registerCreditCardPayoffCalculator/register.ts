import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerCreditCardPayoffCalculator } from './registerCreditCardPayoffCalculator';

export function registerregisterCreditCardPayoffCalculator(): void {
  calculatorRegistry.register(new registerCreditCardPayoffCalculator());
}
