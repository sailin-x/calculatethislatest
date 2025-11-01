import { calculatorRegistry } from '../../data/calculatorRegistry';
import { rentalPropertyROICalculator } from './rentalPropertyROICalculator';

export function registerrentalPropertyROICalculator(): void {
  calculatorRegistry.register(new rentalPropertyROICalculator());
}
