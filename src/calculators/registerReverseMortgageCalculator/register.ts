import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerReverseMortgageCalculator } from './registerReverseMortgageCalculator';

export function registerregisterReverseMortgageCalculator(): void {
  calculatorRegistry.register(new registerReverseMortgageCalculator());
}
