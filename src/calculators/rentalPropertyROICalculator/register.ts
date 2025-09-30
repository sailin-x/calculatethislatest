import { calculatorRegistry } from '../../data/calculatorRegistry';
import { rentalPropertyROICalculatorCalculator } from './rentalPropertyROICalculatorCalculator';

export function registerrentalPropertyROICalculatorCalculator(): void {
  calculatorRegistry.register(new rentalPropertyROICalculatorCalculator());
}
