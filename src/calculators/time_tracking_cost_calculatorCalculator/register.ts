import { calculatorRegistry } from '../../data/calculatorRegistry';
import { time_tracking_cost_calculatorCalculatorCalculator } from './time_tracking_cost_calculatorCalculatorCalculator';

export function registertime_tracking_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new time_tracking_cost_calculatorCalculatorCalculator());
}
