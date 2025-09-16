import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { requiredMinimumDistributionRMDCalculator } from './RequiredMinimumDistributionRMDCalculator';

/**
 * Register the Required Minimum Distribution RMD Calculator
 */
export function registerRequiredMinimumDistributionRMDCalculator(): void {
  calculatorRegistry.register(requiredMinimumDistributionRMDCalculator);
}