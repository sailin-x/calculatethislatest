import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { mortgagePayoffCalculator } from './MortgagePayoffCalculator';

/**
 * Register the Mortgage Payoff Calculator with the CalculatorRegistry
 */
export function registerMortgagePayoffCalculator(registry: CalculatorRegistry): void {
  registry.register(mortgagePayoffCalculator);
}