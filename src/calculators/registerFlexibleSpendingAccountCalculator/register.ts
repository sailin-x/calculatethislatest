import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerFlexibleSpendingAccountCalculator } from './registerFlexibleSpendingAccountCalculator';

export function registerregisterFlexibleSpendingAccountCalculator(): void {
  calculatorRegistry.register(new registerFlexibleSpendingAccountCalculator());
}
