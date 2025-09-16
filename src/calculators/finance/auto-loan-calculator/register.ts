import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { autoLoanCalculator } from './AutoLoanCalculator';

/**
 * Register the Auto Loan Calculator with the system
 */
export function registerAutoLoanCalculator(): void {
  calculatorRegistry.register(autoLoanCalculator);
}

/**
 * Unregister the Auto Loan Calculator from the system
 */
export function unregisterAutoLoanCalculator(): boolean {
  return calculatorRegistry.unregister('auto-loan-calculator');
}

// Auto-register when this module is imported
registerAutoLoanCalculator();