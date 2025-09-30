import { calculatorRegistry } from '../../data/calculatorRegistry';
import { biweekly_mortgageCalculatorCalculator } from './biweekly_mortgageCalculatorCalculator';

export function registerbiweekly_mortgageCalculatorCalculator(): void {
  calculatorRegistry.register(new biweekly_mortgageCalculatorCalculator());
}
