import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerComprehensiveMortgageCalculator } from './registerComprehensiveMortgageCalculator';

export function registerregisterComprehensiveMortgageCalculator(): void {
  calculatorRegistry.register(new registerComprehensiveMortgageCalculator());
}
