import { calculatorRegistry } from '../../data/calculatorRegistry';
import { flexible_spending_account_calculatorCalculatorCalculator } from './flexible_spending_account_calculatorCalculatorCalculator';

export function registerflexible_spending_account_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new flexible_spending_account_calculatorCalculatorCalculator());
}
