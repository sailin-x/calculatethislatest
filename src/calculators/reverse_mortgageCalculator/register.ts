import { calculatorRegistry } from '../../data/calculatorRegistry';
import { reverse_mortgageCalculatorCalculator } from './reverse_mortgageCalculatorCalculator';

export function registerreverse_mortgageCalculatorCalculator(): void {
  calculatorRegistry.register(new reverse_mortgageCalculatorCalculator());
}
