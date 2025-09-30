import { calculatorRegistry } from '../../data/calculatorRegistry';
import { interest_rate_swap_calculatorCalculatorCalculator } from './interest_rate_swap_calculatorCalculatorCalculator';

export function registerinterest_rate_swap_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new interest_rate_swap_calculatorCalculatorCalculator());
}
