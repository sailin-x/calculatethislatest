import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CreditDefaultSwapCalculatorCalculator } from './CreditDefaultSwapCalculatorCalculator';

export function registerCreditDefaultSwapCalculatorCalculator(): void {
  calculatorRegistry.register(new CreditDefaultSwapCalculatorCalculator());
}
