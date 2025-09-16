import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { fafsaCalculator } from './FAFSACalculator';

/**
 * Register the FAFSA Calculator
 */
export function registerFAFSACalculator(): void {
  calculatorRegistry.register(fafsaCalculator);
}