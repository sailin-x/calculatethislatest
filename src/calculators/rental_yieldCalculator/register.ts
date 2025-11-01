import { calculatorRegistry } from '../../data/calculatorRegistry';
import { rental_yieldCalculator } from './rental_yieldCalculator';

export function registerrental_yieldCalculator(): void {
  calculatorRegistry.register(new rental_yieldCalculator());
}
