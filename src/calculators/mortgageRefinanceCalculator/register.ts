import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgageRefinanceCalculator } from './mortgageRefinanceCalculator';

export function registermortgageRefinanceCalculator(): void {
  calculatorRegistry.register(new mortgageRefinanceCalculator());
}
