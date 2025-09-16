import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { rentersInsuranceCalculator } from './RentersInsuranceCalculator';

/**
 * Register the Renters Insurance Calculator
 */
export function registerRentersInsuranceCalculator(): void {
  calculatorRegistry.register(rentersInsuranceCalculator);
}