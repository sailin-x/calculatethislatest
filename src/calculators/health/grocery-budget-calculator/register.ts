import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { GroceryBudgetCalculator } from './GroceryBudgetCalculator';

export function registerGroceryBudgetCalculator(): void {
  calculatorRegistry.register(GroceryBudgetCalculator);
}

export { GroceryBudgetCalculator };
