import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerComprehensiveMortgageCalculatorCalculator } from './registerComprehensiveMortgageCalculatorCalculator';

export function registerregisterComprehensiveMortgageCalculatorCalculator(): void {
  calculatorRegistry.register(new registerComprehensiveMortgageCalculatorCalculator());
}
