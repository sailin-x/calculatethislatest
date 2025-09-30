import { calculatorRegistry } from '../../data/calculatorRegistry';
import { roaming_cost_calculatorCalculatorCalculator } from './roaming_cost_calculatorCalculatorCalculator';

export function registerroaming_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new roaming_cost_calculatorCalculatorCalculator());
}
