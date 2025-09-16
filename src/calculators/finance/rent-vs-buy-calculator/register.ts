import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { rentVsBuyCalculator } from './RentVsBuyCalculator';

/**
 * Register the Rent vs. Buy Calculator
 */
export function registerRentVsBuyCalculator(): void {
  calculatorRegistry.register(rentVsBuyCalculator);
}