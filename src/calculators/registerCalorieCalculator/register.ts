import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerCalorieCalculator } from './registerCalorieCalculator';

export function registerregisterCalorieCalculator(): void {
  calculatorRegistry.register(new registerCalorieCalculator());
}
