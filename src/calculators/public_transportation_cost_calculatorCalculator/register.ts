import { calculatorRegistry } from '../../data/calculatorRegistry';
import { public_transportation_cost_calculatorCalculatorCalculator } from './public_transportation_cost_calculatorCalculatorCalculator';

export function registerpublic_transportation_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new public_transportation_cost_calculatorCalculatorCalculator());
}
