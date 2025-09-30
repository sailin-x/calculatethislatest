import { calculatorRegistry } from '../../data/calculatorRegistry';
import { interest_only_mortgageCalculatorCalculator } from './interest_only_mortgageCalculatorCalculator';

export function registerinterest_only_mortgageCalculatorCalculator(): void {
  calculatorRegistry.register(new interest_only_mortgageCalculatorCalculator());
}
