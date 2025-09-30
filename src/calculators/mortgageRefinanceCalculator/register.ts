import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgageRefinanceCalculatorCalculator } from './mortgageRefinanceCalculatorCalculator';

export function registermortgageRefinanceCalculatorCalculator(): void {
  calculatorRegistry.register(new mortgageRefinanceCalculatorCalculator());
}
