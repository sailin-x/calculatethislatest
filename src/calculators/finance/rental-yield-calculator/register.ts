import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { rentalYieldCalculator } from './RentalYieldCalculator';

/**
 * Register the Rental Yield Calculator
 */
export function registerRentalYieldCalculator(): void {
  calculatorRegistry.register(rentalYieldCalculator);
}