import { calculatorRegistry } from '../../data/calculatorRegistry';
import { balloon_mortgageCalculator } from './balloon_mortgageCalculator';

export function registerballoon_mortgageCalculator(): void {
  calculatorRegistry.register(new balloon_mortgageCalculator());
}
