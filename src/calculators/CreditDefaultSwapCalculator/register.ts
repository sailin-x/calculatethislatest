import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CreditDefaultSwapCalculator } from './CreditDefaultSwapCalculator';

export function registerCreditDefaultSwapCalculator(): void {
  calculatorRegistry.register(new CreditDefaultSwapCalculator());
}
