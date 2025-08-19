import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { MortgageClosingCostCalculator } from './MortgageClosingCostCalculator';

export function registerMortgageClosingCostCalculator(registry: CalculatorRegistry): void {
  registry.register(MortgageClosingCostCalculator);
}