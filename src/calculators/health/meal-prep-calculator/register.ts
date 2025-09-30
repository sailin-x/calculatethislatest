import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MealPrepCalculator } from './MealPrepCalculator';

export function registerMealPrepCalculator(): void {
  calculatorRegistry.register(MealPrepCalculator);
}

export { MealPrepCalculator };
