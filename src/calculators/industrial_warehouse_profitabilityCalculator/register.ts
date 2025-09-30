import { calculatorRegistry } from '../../data/calculatorRegistry';
import { industrial_warehouse_profitabilityCalculatorCalculator } from './industrial_warehouse_profitabilityCalculatorCalculator';

export function registerindustrial_warehouse_profitabilityCalculatorCalculator(): void {
  calculatorRegistry.register(new industrial_warehouse_profitabilityCalculatorCalculator());
}
