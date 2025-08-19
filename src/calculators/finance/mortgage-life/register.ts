import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { mortgageLifeCalculator } from './MortgageLifeCalculator';

/**
 * Register the Mortgage Life Calculator with the CalculatorRegistry
 */
export function registerMortgageLifeCalculator(registry: CalculatorRegistry): void {
  registry.register(mortgageLifeCalculator);
}