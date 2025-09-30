import { calculatorRegistry } from '../../data/calculatorRegistry';
import { hotel_feasibilityCalculatorCalculator } from './hotel_feasibilityCalculatorCalculator';

export function registerhotel_feasibilityCalculatorCalculator(): void {
  calculatorRegistry.register(new hotel_feasibilityCalculatorCalculator());
}
