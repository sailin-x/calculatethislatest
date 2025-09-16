import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { flexibleSpendingAccountCalculator } from './FlexibleSpendingAccountCalculator';

/**
 * Register the Flexible Spending Account Calculator
 */
export function registerFlexibleSpendingAccountCalculator(): void {
  calculatorRegistry.register(flexibleSpendingAccountCalculator);
}