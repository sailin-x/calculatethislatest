import { calculatorRegistry } from '../../data/calculatorRegistry';
import { hosting_cost_calculatorCalculatorCalculator } from './hosting_cost_calculatorCalculatorCalculator';

export function registerhosting_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new hosting_cost_calculatorCalculatorCalculator());
}
