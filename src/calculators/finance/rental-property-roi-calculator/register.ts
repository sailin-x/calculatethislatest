import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { rentalPropertyROICalculator } from './RentalPropertyROICalculator';

/**
 * Register the Rental Property ROI Calculator
 */
export function registerRentalPropertyROICalculator(): void {
  calculatorRegistry.register(rentalPropertyROICalculator);
}