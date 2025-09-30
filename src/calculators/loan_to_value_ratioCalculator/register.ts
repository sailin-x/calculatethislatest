import { calculatorRegistry } from '../../data/calculatorRegistry';
import { loan_to_value_ratioCalculatorCalculator } from './loan_to_value_ratioCalculatorCalculator';

export function registerloan_to_value_ratioCalculatorCalculator(): void {
  calculatorRegistry.register(new loan_to_value_ratioCalculatorCalculator());
}
