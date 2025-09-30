import { calculatorRegistry } from '../../data/calculatorRegistry';
import { activity_cost_calculatorCalculatorCalculator } from './activity_cost_calculatorCalculatorCalculator';

export function registeractivity_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new activity_cost_calculatorCalculatorCalculator());
}
