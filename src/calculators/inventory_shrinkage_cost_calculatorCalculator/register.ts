import { calculatorRegistry } from '../../data/calculatorRegistry';
import { inventory_shrinkage_cost_calculatorCalculatorCalculator } from './inventory_shrinkage_cost_calculatorCalculatorCalculator';

export function registerinventory_shrinkage_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new inventory_shrinkage_cost_calculatorCalculatorCalculator());
}
