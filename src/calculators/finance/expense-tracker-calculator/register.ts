import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ExpenseTrackerCalculator } from './ExpenseTrackerCalculator';

export function registerExpenseTrackerCalculator(): void {
  calculatorRegistry.register(ExpenseTrackerCalculator);
}

export { ExpenseTrackerCalculator };
