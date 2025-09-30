import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FoodCostCalculator } from './FoodCostCalculator';

export function registerFoodCostCalculator(): void {
  calculatorRegistry.register(FoodCostCalculator);
}

export { FoodCostCalculator };
