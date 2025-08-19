import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { mortgagePointsCalculator } from './MortgagePointsCalculator';

/**
 * Register the Mortgage Points Calculator with the CalculatorRegistry
 */
export function registerMortgagePointsCalculator(registry: CalculatorRegistry): void {
  registry.register(mortgagePointsCalculator);
}