import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MortgageRefinanceCalculator } from './MortgageRefinanceCalculator';

export function registerMortgageRefinanceCalculator(): void {
  calculatorRegistry.register(MortgageRefinanceCalculator);
}