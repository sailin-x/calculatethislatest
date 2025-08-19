import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { MortgageAPRComparisonCalculator } from './MortgageAPRComparisonCalculator';

export function registerMortgageAPRComparisonCalculator(registry: CalculatorRegistry): void {
  registry.register(MortgageAPRComparisonCalculator);
}

export { MortgageAPRComparisonCalculator };