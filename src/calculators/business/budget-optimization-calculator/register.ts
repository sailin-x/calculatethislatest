import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BudgetOptimizationCalculator } from './BudgetOptimizationCalculator';

export function registerBudgetOptimizationCalculator(): void {
  calculatorRegistry.register(BudgetOptimizationCalculator);
}

export { BudgetOptimizationCalculator };
