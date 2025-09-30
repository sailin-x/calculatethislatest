import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MealKitCostCalculator } from './MealKitCostCalculator';

export function registerMealKitCostCalculator(): void {
  calculatorRegistry.register(MealKitCostCalculator);
}

export { MealKitCostCalculator };
