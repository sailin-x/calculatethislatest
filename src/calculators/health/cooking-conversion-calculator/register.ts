import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CookingConversionCalculator } from './CookingConversionCalculator';

export function registerCookingConversionCalculator(): void {
  calculatorRegistry.register(CookingConversionCalculator);
}

export { CookingConversionCalculator };
