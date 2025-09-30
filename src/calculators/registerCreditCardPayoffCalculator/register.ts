import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerCreditCardPayoffCalculatorCalculator } from './registerCreditCardPayoffCalculatorCalculator';

export function registerregisterCreditCardPayoffCalculatorCalculator(): void {
  calculatorRegistry.register(new registerCreditCardPayoffCalculatorCalculator());
}
