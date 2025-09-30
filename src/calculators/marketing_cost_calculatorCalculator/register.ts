import { calculatorRegistry } from '../../data/calculatorRegistry';
import { marketing_cost_calculatorCalculatorCalculator } from './marketing_cost_calculatorCalculatorCalculator';

export function registermarketing_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new marketing_cost_calculatorCalculatorCalculator());
}
