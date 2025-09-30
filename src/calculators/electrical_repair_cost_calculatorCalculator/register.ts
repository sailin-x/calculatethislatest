import { calculatorRegistry } from '../../data/calculatorRegistry';
import { electrical_repair_cost_calculatorCalculatorCalculator } from './electrical_repair_cost_calculatorCalculatorCalculator';

export function registerelectrical_repair_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new electrical_repair_cost_calculatorCalculatorCalculator());
}
