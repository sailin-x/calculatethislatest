import { calculatorRegistry } from '../../data/calculatorRegistry';
import { toll_cost_calculatorCalculatorCalculator } from './toll_cost_calculatorCalculatorCalculator';

export function registertoll_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new toll_cost_calculatorCalculatorCalculator());
}
