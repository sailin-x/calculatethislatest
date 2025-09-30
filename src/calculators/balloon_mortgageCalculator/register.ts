import { calculatorRegistry } from '../../data/calculatorRegistry';
import { balloon_mortgageCalculatorCalculator } from './balloon_mortgageCalculatorCalculator';

export function registerballoon_mortgageCalculatorCalculator(): void {
  calculatorRegistry.register(new balloon_mortgageCalculatorCalculator());
}
