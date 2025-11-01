import { calculatorRegistry } from '../../data/calculatorRegistry';
import { loan_to_cost_ratioCalculator } from './loan_to_cost_ratioCalculator';

export function registerloan_to_cost_ratioCalculator(): void {
  calculatorRegistry.register(new loan_to_cost_ratioCalculator());
}
