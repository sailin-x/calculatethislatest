import { calculatorRegistry } from '../../data/calculatorRegistry';
import { industrial_warehouse_profitabilityCalculator } from './industrial_warehouse_profitabilityCalculator';

export function registerindustrial_warehouse_profitabilityCalculator(): void {
  calculatorRegistry.register(new industrial_warehouse_profitabilityCalculator());
}
