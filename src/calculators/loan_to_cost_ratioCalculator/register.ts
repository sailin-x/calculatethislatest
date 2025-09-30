import { calculatorRegistry } from '../../data/calculatorRegistry';
import { loan_to_cost_ratioCalculatorCalculator } from './loan_to_cost_ratioCalculatorCalculator';

export function registerloan_to_cost_ratioCalculatorCalculator(): void {
  calculatorRegistry.register(new loan_to_cost_ratioCalculatorCalculator());
}
