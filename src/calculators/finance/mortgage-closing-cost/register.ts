import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MortgageClosingCostCalculator } from './MortgageClosingCostCalculator';

export function registerMortgageClosingCostCalculator(): void {
  calculatorRegistry.register(mortgageClosingCostCalculator);
}
