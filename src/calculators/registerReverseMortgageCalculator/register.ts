import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerReverseMortgageCalculatorCalculator } from './registerReverseMortgageCalculatorCalculator';

export function registerregisterReverseMortgageCalculatorCalculator(): void {
  calculatorRegistry.register(new registerReverseMortgageCalculatorCalculator());
}
