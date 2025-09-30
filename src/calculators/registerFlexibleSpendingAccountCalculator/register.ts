import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerFlexibleSpendingAccountCalculatorCalculator } from './registerFlexibleSpendingAccountCalculatorCalculator';

export function registerregisterFlexibleSpendingAccountCalculatorCalculator(): void {
  calculatorRegistry.register(new registerFlexibleSpendingAccountCalculatorCalculator());
}
