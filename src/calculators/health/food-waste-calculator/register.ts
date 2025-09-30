import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FoodWasteCalculator } from './FoodWasteCalculator';

export function registerFoodWasteCalculator(): void {
  calculatorRegistry.register(FoodWasteCalculator);
}

export { FoodWasteCalculator };
