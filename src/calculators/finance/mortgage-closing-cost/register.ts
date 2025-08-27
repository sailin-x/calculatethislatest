import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { mortgageClosingCostCalculator } from './MortgageClosingCostCalculator';

export function registerMortgageClosingCostCalculator(): void {
  calculatorRegistry.register(mortgageClosingCostCalculator);
}
