import { calculatorRegistry } from '../../data/calculatorRegistry';
import { flexibleSpendingAccountCalculator } from './flexibleSpendingAccountCalculator';

export function registerflexibleSpendingAccountCalculator(): void {
  calculatorRegistry.register(new flexibleSpendingAccountCalculator());
}
