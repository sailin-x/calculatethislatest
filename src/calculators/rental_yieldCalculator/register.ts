import { calculatorRegistry } from '../../data/calculatorRegistry';
import { rental_yieldCalculatorCalculator } from './rental_yieldCalculatorCalculator';

export function registerrental_yieldCalculatorCalculator(): void {
  calculatorRegistry.register(new rental_yieldCalculatorCalculator());
}
