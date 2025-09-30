import { calculatorRegistry } from '../../data/calculatorRegistry';
import { flexibleSpendingAccountCalculatorCalculator } from './flexibleSpendingAccountCalculatorCalculator';

export function registerflexibleSpendingAccountCalculatorCalculator(): void {
  calculatorRegistry.register(new flexibleSpendingAccountCalculatorCalculator());
}
