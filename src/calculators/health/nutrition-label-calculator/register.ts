import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { NutritionLabelCalculator } from './NutritionLabelCalculator';

export function registerNutritionLabelCalculator(): void {
  calculatorRegistry.register(NutritionLabelCalculator);
}

export { NutritionLabelCalculator };
