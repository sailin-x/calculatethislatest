import { calculatorRegistry } from '../../data/calculatorRegistry';
import { plumbing_repair_cost_calculatorCalculatorCalculator } from './plumbing_repair_cost_calculatorCalculatorCalculator';

export function registerplumbing_repair_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new plumbing_repair_cost_calculatorCalculatorCalculator());
}
