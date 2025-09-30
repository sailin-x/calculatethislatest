import { calculatorRegistry } from '../../data/calculatorRegistry';
import { parking_cost_calculatorCalculatorCalculator } from './parking_cost_calculatorCalculatorCalculator';

export function registerparking_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new parking_cost_calculatorCalculatorCalculator());
}
