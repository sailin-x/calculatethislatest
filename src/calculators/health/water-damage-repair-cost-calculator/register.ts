import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { WaterDamageRepairCostCalculator } from './WaterDamageRepairCostCalculator';

export function registerWaterDamageRepairCostCalculator(): void {
  calculatorRegistry.register(WaterDamageRepairCostCalculator);
}

export { WaterDamageRepairCostCalculator };
