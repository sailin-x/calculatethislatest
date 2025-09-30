import { calculatorRegistry } from '../../data/calculatorRegistry';
import { sum_of_parts_calculatorCalculatorCalculator } from './sum_of_parts_calculatorCalculatorCalculator';

export function registersum_of_parts_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new sum_of_parts_calculatorCalculatorCalculator());
}
