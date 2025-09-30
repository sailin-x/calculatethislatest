import { calculatorRegistry } from '../../data/calculatorRegistry';
import { cookingCalculatorCalculator } from './cookingCalculatorCalculator';

export function registercookingCalculatorCalculator(): void {
  calculatorRegistry.register(new cookingCalculatorCalculator());
}
