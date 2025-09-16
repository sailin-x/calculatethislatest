import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { reverseMortgageCalculator } from './ReverseMortgageCalculator';

/**
 * Register the Reverse Mortgage Calculator
 */
export function registerReverseMortgageCalculator(): void {
  calculatorRegistry.register(reverseMortgageCalculator);
}