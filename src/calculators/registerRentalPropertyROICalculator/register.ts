import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRentalPropertyROICalculator } from './registerRentalPropertyROICalculator';

export function registerregisterRentalPropertyROICalculator(): void {
  calculatorRegistry.register(new registerRentalPropertyROICalculator());
}
