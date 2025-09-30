import { calculatorRegistry } from '../../data/calculatorRegistry';
import { gas_cost_calculatorCalculatorCalculator } from './gas_cost_calculatorCalculatorCalculator';

export function registergas_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new gas_cost_calculatorCalculatorCalculator());
}
