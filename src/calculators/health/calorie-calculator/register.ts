import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CalorieCalculator } from './CalorieCalculator';

export function registerCalorieCalculator(): void {
  calculatorRegistry.register(CalorieCalculator);
}

export { CalorieCalculator };
