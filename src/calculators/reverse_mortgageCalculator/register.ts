import { calculatorRegistry } from '../../data/calculatorRegistry';
import { reverse_mortgageCalculator } from './reverse_mortgageCalculator';

export function registerreverse_mortgageCalculator(): void {
  calculatorRegistry.register(new reverse_mortgageCalculator());
}
