import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CreditCardCalculator } from './CreditCardCalculator';

export function registerCreditCardCalculator(): void {
  calculatorRegistry.register(CreditCardCalculator);
}

export { CreditCardCalculator };
