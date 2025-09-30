import { calculatorRegistry } from '../../data/calculatorRegistry';
import { down_payment_assistanceCalculatorCalculator } from './down_payment_assistanceCalculatorCalculator';

export function registerdown_payment_assistanceCalculatorCalculator(): void {
  calculatorRegistry.register(new down_payment_assistanceCalculatorCalculator());
}
