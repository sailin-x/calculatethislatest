import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { healthSavingsAccountCalculator } from './HealthSavingsAccountCalculator';

/**
 * Register the Health Savings Account (HSA) Calculator
 */
export function registerHealthSavingsAccountCalculator(): void {
  calculatorRegistry.register(healthSavingsAccountCalculator);
}