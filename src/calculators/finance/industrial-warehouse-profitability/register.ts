import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { IndustrialWarehouseProfitabilityCalculator } from './IndustrialWarehouseProfitabilityCalculator';

export function registerIndustrialWarehouseProfitabilityCalculator(registry: CalculatorRegistry): void {
  registry.register(IndustrialWarehouseProfitabilityCalculator);
}

export { IndustrialWarehouseProfitabilityCalculator };
