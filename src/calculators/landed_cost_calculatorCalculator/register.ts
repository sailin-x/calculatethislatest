import { calculatorRegistry } from '../../data/calculatorRegistry';
import { landed_cost_calculatorCalculatorCalculator } from './landed_cost_calculatorCalculatorCalculator';

export function registerlanded_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new landed_cost_calculatorCalculatorCalculator());
}
