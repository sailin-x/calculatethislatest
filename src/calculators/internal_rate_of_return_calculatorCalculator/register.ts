import { calculatorRegistry } from '../../data/calculatorRegistry';
import { internal_rate_of_return_calculatorCalculatorCalculator } from './internal_rate_of_return_calculatorCalculatorCalculator';

export function registerinternal_rate_of_return_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new internal_rate_of_return_calculatorCalculatorCalculator());
}
