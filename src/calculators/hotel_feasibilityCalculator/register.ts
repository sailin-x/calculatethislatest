import { calculatorRegistry } from '../../data/calculatorRegistry';
import { hotel_feasibilityCalculator } from './hotel_feasibilityCalculator';

export function registerhotel_feasibilityCalculator(): void {
  calculatorRegistry.register(new hotel_feasibilityCalculator());
}
