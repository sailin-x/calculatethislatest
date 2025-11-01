import { calculatorRegistry } from '../../data/calculatorRegistry';
import { biweekly_mortgageCalculator } from './biweekly_mortgageCalculator';

export function registerbiweekly_mortgageCalculator(): void {
  calculatorRegistry.register(new biweekly_mortgageCalculator());
}
