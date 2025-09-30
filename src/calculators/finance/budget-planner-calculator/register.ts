import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BudgetPlannerCalculator } from './BudgetPlannerCalculator';

export function registerBudgetPlannerCalculator(): void {
  calculatorRegistry.register(BudgetPlannerCalculator);
}

export { BudgetPlannerCalculator };
