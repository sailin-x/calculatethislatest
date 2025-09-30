import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { RecipeScalingCalculator } from './RecipeScalingCalculator';

export function registerRecipeScalingCalculator(): void {
  calculatorRegistry.register(RecipeScalingCalculator);
}

export { RecipeScalingCalculator };
