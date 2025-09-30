import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CookingCalculator } from './CookingCalculator';

export function registerCookingCalculator(): void {
  calculatorRegistry.register(CookingCalculator);
}

export { CookingCalculator };
