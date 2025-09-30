import { calculatorRegistry } from '../../data/calculatorRegistry';
import { roofing_repair_cost_calculatorCalculatorCalculator } from './roofing_repair_cost_calculatorCalculatorCalculator';

export function registerroofing_repair_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new roofing_repair_cost_calculatorCalculatorCalculator());
}
