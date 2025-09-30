import { calculatorRegistry } from '../../data/calculatorRegistry';
import { rideshare_cost_calculatorCalculatorCalculator } from './rideshare_cost_calculatorCalculatorCalculator';

export function registerrideshare_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new rideshare_cost_calculatorCalculatorCalculator());
}
