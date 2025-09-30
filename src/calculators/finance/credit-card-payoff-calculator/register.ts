import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { creditCardPayoffCalculator } from './CreditCardPayoffCalculator';

export function registerCreditCardPayoffCalculator(): void {
  calculatorRegistry.register(creditCardPayoffCalculator);
}