import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { MortgageEquityCalculator } from './MortgageEquityCalculator';

export function registerMortgageEquityCalculator(registry: CalculatorRegistry): void {
  registry.register(MortgageEquityCalculator);
}