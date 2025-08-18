import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { InterestOnlyMortgageCalculator } from './InterestOnlyMortgageCalculator';

export function registerInterestOnlyMortgageCalculator(registry: CalculatorRegistry): void {
  registry.register(InterestOnlyMortgageCalculator);
}

export { InterestOnlyMortgageCalculator };
