import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CreditDefaultSwapCalculator } from './CreditDefaultSwapCalculator';

export function registerCreditDefaultSwapCalculator(): void {
  calculatorRegistry.register(CreditDefaultSwapCalculator);
}

export { CreditDefaultSwapCalculator };
