import { calculatorRegistry } from '../../data/calculatorRegistry';
import { inventory_turnover_calculatorCalculatorCalculator } from './inventory_turnover_calculatorCalculatorCalculator';

export function registerinventory_turnover_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new inventory_turnover_calculatorCalculatorCalculator());
}
