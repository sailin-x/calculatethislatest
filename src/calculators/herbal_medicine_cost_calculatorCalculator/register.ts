import { calculatorRegistry } from '../../data/calculatorRegistry';
import { herbal_medicine_cost_calculatorCalculatorCalculator } from './herbal_medicine_cost_calculatorCalculatorCalculator';

export function registerherbal_medicine_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new herbal_medicine_cost_calculatorCalculatorCalculator());
}
