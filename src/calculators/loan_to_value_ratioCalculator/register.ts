import { calculatorRegistry } from '../../data/calculatorRegistry';
import { loan_to_value_ratioCalculator } from './loan_to_value_ratioCalculator';

export function registerloan_to_value_ratioCalculator(): void {
  calculatorRegistry.register(new loan_to_value_ratioCalculator());
}
