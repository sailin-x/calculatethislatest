import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { paycheckCalculator } from './PaycheckCalculator';

/**
 * Register the Paycheck Calculator with the system
 */
export function registerPaycheckCalculator(): void {
  calculatorRegistry.register(paycheckCalculator);
}

/**
 * Unregister the Paycheck Calculator from the system
 */
export function unregisterPaycheckCalculator(): boolean {
  return calculatorRegistry.unregister('paycheck-calculator');
}

// Export the calculator for direct access if needed
export { paycheckCalculator };