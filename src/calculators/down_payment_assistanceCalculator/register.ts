import { calculatorRegistry } from '../../data/calculatorRegistry';
import { down_payment_assistanceCalculator } from './down_payment_assistanceCalculator';

export function registerdown_payment_assistanceCalculator(): void {
  calculatorRegistry.register(new down_payment_assistanceCalculator());
}
