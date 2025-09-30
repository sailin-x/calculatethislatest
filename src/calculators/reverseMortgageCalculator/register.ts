import { calculatorRegistry } from '../../data/calculatorRegistry';
import { reverseMortgageCalculatorCalculator } from './reverseMortgageCalculatorCalculator';

export function registerreverseMortgageCalculatorCalculator(): void {
  calculatorRegistry.register(new reverseMortgageCalculatorCalculator());
}
