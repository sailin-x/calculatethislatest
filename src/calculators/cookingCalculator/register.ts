import { calculatorRegistry } from '../../data/calculatorRegistry';
import { cookingCalculator } from './cookingCalculator';

export function registercookingCalculator(): void {
  calculatorRegistry.register(new cookingCalculator());
}
