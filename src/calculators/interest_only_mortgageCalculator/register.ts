import { calculatorRegistry } from '../../data/calculatorRegistry';
import { interest_only_mortgageCalculator } from './interest_only_mortgageCalculator';

export function registerinterest_only_mortgageCalculator(): void {
  calculatorRegistry.register(new interest_only_mortgageCalculator());
}
